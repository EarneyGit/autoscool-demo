const express = require('express');
const router = express.Router();

// In-memory storage for form configuration (replace with database in production)
let formConfig = {
  name: 'Contact Form',
  description: 'Main contact form for the website',
  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: { minLength: 2, maxLength: 50 },
      order: 1
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      validation: { minLength: 2, maxLength: 50 },
      order: 2
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      required: true,
      validation: { pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
      order: 3
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: false,
      validation: { pattern: '^[+]?[0-9\\s\\-\\(\\)]+$' },
      order: 4
    },
    {
      id: 'courseType',
      type: 'select',
      label: 'Course Type',
      placeholder: 'Select a course type',
      required: true,
      options: [
        { value: 'car', label: 'Car License (B)' },
        { value: 'motorcycle-a1', label: 'Motorcycle A1 (125cc)' },
        { value: 'motorcycle-a', label: 'Motorcycle A (Unlimited)' },
        { value: 'professional', label: 'Professional License' },
        { value: 'specialized', label: 'Specialized Training' },
        { value: 'package', label: 'Complete Package' }
      ],
      order: 5
    },
    {
      id: 'preferredContact',
      type: 'select',
      label: 'Preferred Contact Method',
      placeholder: 'Select preferred contact method',
      required: false,
      options: [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'whatsapp', label: 'WhatsApp' }
      ],
      order: 6
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter your message or questions',
      required: true,
      validation: { minLength: 10, maxLength: 1000 },
      order: 7
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      required: false,
      order: 8
    }
  ],
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
};

// GET /api/forms/config - Get form configuration
router.get('/config', (req, res) => {
  try {
    res.json({
      success: true,
      data: formConfig
    });
  } catch (error) {
    console.error('Error fetching form config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch form configuration'
    });
  }
});

// PUT /api/forms/config - Update form configuration
router.put('/config', (req, res) => {
  try {
    const { name, description, fields, settings } = req.body;
    
    // Validate required fields
    if (!name || !fields || !Array.isArray(fields)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form configuration data'
      });
    }

    // Validate fields structure
    for (const field of fields) {
      if (!field.id || !field.type || !field.label) {
        return res.status(400).json({
          success: false,
          message: 'Each field must have id, type, and label'
        });
      }
    }

    // Update form configuration
    formConfig = {
      name,
      description: description || '',
      fields: fields.map((field, index) => ({
        ...field,
        order: field.order || index + 1
      })),
      settings: {
        ...formConfig.settings,
        ...settings
      }
    };

    // TODO: Save to database
    console.log('Form configuration updated:', formConfig);

    res.json({
      success: true,
      message: 'Form configuration updated successfully',
      data: formConfig
    });
  } catch (error) {
    console.error('Error updating form config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update form configuration'
    });
  }
});

// GET /api/forms/fields - Get available field types
router.get('/fields', (req, res) => {
  try {
    const fieldTypes = [
      {
        type: 'text',
        label: 'Text Input',
        description: 'Single line text input',
        hasOptions: false,
        validationOptions: ['minLength', 'maxLength', 'pattern']
      },
      {
        type: 'email',
        label: 'Email Input',
        description: 'Email address input with validation',
        hasOptions: false,
        validationOptions: ['pattern']
      },
      {
        type: 'tel',
        label: 'Phone Input',
        description: 'Phone number input',
        hasOptions: false,
        validationOptions: ['pattern']
      },
      {
        type: 'textarea',
        label: 'Textarea',
        description: 'Multi-line text input',
        hasOptions: false,
        validationOptions: ['minLength', 'maxLength']
      },
      {
        type: 'select',
        label: 'Select Dropdown',
        description: 'Dropdown selection with options',
        hasOptions: true,
        validationOptions: []
      },
      {
        type: 'radio',
        label: 'Radio Buttons',
        description: 'Single selection from multiple options',
        hasOptions: true,
        validationOptions: []
      },
      {
        type: 'checkbox',
        label: 'Checkbox',
        description: 'Boolean checkbox input',
        hasOptions: false,
        validationOptions: []
      }
    ];

    res.json({
      success: true,
      data: fieldTypes
    });
  } catch (error) {
    console.error('Error fetching field types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch field types'
    });
  }
});

// POST /api/forms/validate - Validate form configuration
router.post('/validate', (req, res) => {
  try {
    const { fields } = req.body;
    const errors = [];
    const warnings = [];

    if (!fields || !Array.isArray(fields)) {
      errors.push('Fields must be an array');
    } else {
      // Check for duplicate field IDs
      const fieldIds = fields.map(f => f.id);
      const duplicateIds = fieldIds.filter((id, index) => fieldIds.indexOf(id) !== index);
      if (duplicateIds.length > 0) {
        errors.push(`Duplicate field IDs found: ${duplicateIds.join(', ')}`);
      }

      // Check for required fields
      fields.forEach((field, index) => {
        if (!field.id) {
          errors.push(`Field at position ${index + 1} is missing an ID`);
        }
        if (!field.type) {
          errors.push(`Field '${field.id || index + 1}' is missing a type`);
        }
        if (!field.label) {
          errors.push(`Field '${field.id || index + 1}' is missing a label`);
        }

        // Check for fields with options but no options defined
        if ((field.type === 'select' || field.type === 'radio') && (!field.options || field.options.length === 0)) {
          warnings.push(`Field '${field.label}' requires options but none are defined`);
        }
      });

      // Check if form has at least one field
      if (fields.length === 0) {
        warnings.push('Form has no fields defined');
      }
    }

    res.json({
      success: true,
      valid: errors.length === 0,
      errors,
      warnings
    });
  } catch (error) {
    console.error('Error validating form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate form configuration'
    });
  }
});

module.exports = router;