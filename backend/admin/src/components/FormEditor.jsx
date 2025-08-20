import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import Button from './Button';

const FormEditor = ({ isOpen, onClose, onSave }) => {
  const [config, setConfig] = useState({
    name: '',
    description: '',
    fields: [],
    settings: {
      submitButtonText: 'Send Message',
      successMessage: 'Thank you for your message! We\'ll get back to you soon.',
      errorMessage: 'Sorry, there was an error sending your message. Please try again.',
      redirectAfterSubmit: false,
      redirectUrl: '',
      emailNotifications: true,
      autoReply: true,
      autoReplySubject: 'Thank you for contacting us',
      autoReplyMessage: 'We have received your message and will respond within 24 hours.'
    }
  });

  const [editingField, setEditingField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [validationResult, setValidationResult] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      loadFormConfig();
      loadFieldTypes();
    }
  }, [isOpen]);

  const loadFormConfig = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/forms/config`);
      if (response.data.success) {
        setConfig(response.data.data);
      } else {
        console.error('Failed to load form config:', response.data.message);
      }
    } catch (error) {
      console.error('Error loading form config:', error);
      toast.error('Failed to load form configuration');
    } finally {
      setLoading(false);
    }
  };

  const loadFieldTypes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/forms/fields`);
      if (response.data.success) {
        setFieldTypes(response.data.data);
      }
    } catch (error) {
      console.error('Error loading field types:', error);
    }
  };

  const validateForm = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/forms/validate`, {
        fields: config.fields
      });
      if (response.data.success) {
        setValidationResult(response.data);
      }
    } catch (error) {
      console.error('Error validating form:', error);
    }
  };

  const saveFormConfig = async () => {
    setSaving(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/forms/config`,
        config
      );
      if (response.data.success) {
        toast.success('Form configuration saved successfully!');
        queryClient.invalidateQueries(['forms']);
        onClose();
      } else {
        toast.error('Failed to save form configuration: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving form config:', error);
      toast.error('Error saving form configuration');
    } finally {
      setSaving(false);
    }
  };

  const saveFormMutation = useMutation({
    mutationFn: saveFormConfig,
    onSuccess: () => {
      toast.success('Form configuration saved successfully');
      queryClient.invalidateQueries(['formConfig']);
      onSave?.(config);
      onClose();
    },
    onError: (error) => {
      toast.error('Failed to save form configuration');
    }
  });

  const handleSave = async () => {
    // Validate form before saving
    await validateForm();
    
    // Check validation results
    if (validationResult && !validationResult.valid) {
      toast.error('Please fix validation errors before saving');
      return;
    }
    
    // Save the form configuration
    await saveFormConfig();
  };

  const addField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      placeholder: '',
      required: false,
      validation: {},
      order: config.fields.length + 1
    };
    setConfig(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
    setEditingField(newField.id);
  };

  const updateField = (fieldId, updates) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const deleteField = (fieldId) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const moveField = (fieldId, direction) => {
    const fieldIndex = config.fields.findIndex(f => f.id === fieldId);
    if (
      (direction === 'up' && fieldIndex === 0) ||
      (direction === 'down' && fieldIndex === config.fields.length - 1)
    ) {
      return;
    }

    const newFields = [...config.fields];
    const targetIndex = direction === 'up' ? fieldIndex - 1 : fieldIndex + 1;
    [newFields[fieldIndex], newFields[targetIndex]] = [newFields[targetIndex], newFields[fieldIndex]];
    
    // Update order values
    newFields.forEach((field, index) => {
      field.order = index + 1;
    });

    setConfig(prev => ({ ...prev, fields: newFields }));
  };

  const addOption = (fieldId) => {
    const newOption = { value: '', label: '' };
    updateField(fieldId, {
      options: [...(config.fields.find(f => f.id === fieldId)?.options || []), newOption]
    });
  };

  const updateOption = (fieldId, optionIndex, updates) => {
    const field = config.fields.find(f => f.id === fieldId);
    const newOptions = [...field.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], ...updates };
    updateField(fieldId, { options: newOptions });
  };

  const deleteOption = (fieldId, optionIndex) => {
    const field = config.fields.find(f => f.id === fieldId);
    const newOptions = field.options.filter((_, index) => index !== optionIndex);
    updateField(fieldId, { options: newOptions });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Form Editor</h2>
            <p className="text-sm text-gray-600">Configure form fields and settings</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2"
            >
              <EyeIcon className="h-4 w-4" />
              <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Loading State */}
           {loading && (
             <div className="w-full flex items-center justify-center p-12">
               <div className="text-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                 <p className="text-gray-600">Loading form configuration...</p>
               </div>
             </div>
           )}

           {/* Main Editor */}
           {!loading && (
             <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col`}>
            {/* Form Settings */}
            <div className="p-6 border-b bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Form Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submit Button Text
                  </label>
                  <input
                    type="text"
                    value={config.settings.submitButtonText}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      settings: { ...prev.settings, submitButtonText: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Fields Editor */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Form Fields</h3>
                <Button onClick={addField} className="flex items-center space-x-2">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Field</span>
                </Button>
              </div>

              {/* Validation Results */}
              {validationResult && (
                <div className="mb-6 p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">
                    Validation Results
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      validationResult.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {validationResult.valid ? 'Valid' : 'Invalid'}
                    </span>
                  </h4>
                  
                  {validationResult.errors && validationResult.errors.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-red-800 mb-1">Errors:</h5>
                      <ul className="text-sm text-red-700 space-y-1">
                        {validationResult.errors.map((error, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {validationResult.warnings && validationResult.warnings.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-yellow-800 mb-1">Warnings:</h5>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {validationResult.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {config.fields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">#{field.order}</span>
                        <span className="font-medium">{field.label}</span>
                        <span className="text-sm text-gray-500">({field.type})</span>
                        {field.required && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => moveField(field.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveField(field.id, 'down')}
                          disabled={index === config.fields.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <ArrowDownIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingField(editingField === field.id ? null : field.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteField(field.id)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {editingField === field.id && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Field ID
                          </label>
                          <input
                            type="text"
                            value={field.id}
                            onChange={(e) => updateField(field.id, { id: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Field Type
                          </label>
                          <select
                            value={field.type}
                            onChange={(e) => updateField(field.id, { type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="textarea">Textarea</option>
                            <option value="select">Select</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Label
                          </label>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Placeholder
                          </label>
                          <input
                            type="text"
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`required-${field.id}`}
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`required-${field.id}`} className="ml-2 text-sm text-gray-700">
                            Required field
                          </label>
                        </div>

                        {(field.type === 'select' || field.type === 'radio') && (
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Options
                              </label>
                              <Button
                                size="sm"
                                onClick={() => addOption(field.id)}
                                className="flex items-center space-x-1"
                              >
                                <PlusIcon className="h-3 w-3" />
                                <span>Add Option</span>
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {(field.options || []).map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    placeholder="Value"
                                    value={option.value}
                                    onChange={(e) => updateOption(field.id, optionIndex, { value: e.target.value })}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={option.label}
                                    onChange={(e) => updateOption(field.id, optionIndex, { label: e.target.value })}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    onClick={() => deleteOption(field.id, optionIndex)}
                                    className="p-2 text-red-400 hover:text-red-600"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Preview Panel */}
          {showPreview && (
            <div className="w-1/2 border-l bg-gray-50 p-6 overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Form Preview</h3>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-xl font-semibold mb-4">{config.name}</h4>
                <form className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      ) : field.type === 'select' ? (
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">{field.placeholder}</option>
                          {(field.options || []).map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{field.label}</span>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  ))}
                  <Button type="button" className="w-full">
                    {config.settings.submitButtonText}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={validateForm}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Validate Form
          </button>
          <Button onClick={handleSave} loading={saving}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;