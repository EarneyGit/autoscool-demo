import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../contexts/AuthContext';

const contentSchema = z.object({
  section: z.string().min(1, 'Section is required'),
  key: z.string().min(1, 'Key is required'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  layout: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().min(0).default(0)
});

const ContentManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [selectedSection, setSelectedSection] = useState('all');
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery({
    queryKey: ['contents', selectedSection],
    queryFn: () => api.get(`/api/content${selectedSection !== 'all' ? `?section=${selectedSection}` : ''}`).then(res => res.data)
  });

  const { data: sections } = useQuery({
    queryKey: ['content-sections'],
    queryFn: () => api.get('/api/content/sections').then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/api/content', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      setIsModalOpen(false);
      reset();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/content/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      setIsModalOpen(false);
      setEditingContent(null);
      reset();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/content/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }) => api.patch(`/api/content/${id}/toggle`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contentSchema),
    defaultValues: editingContent || {
      isActive: true,
      order: 0
    }
  });

  React.useEffect(() => {
    if (editingContent) {
      reset(editingContent);
    } else {
      reset({
        isActive: true,
        order: 0
      });
    }
  }, [editingContent, reset]);

  const onSubmit = (data) => {
    if (editingContent) {
      updateMutation.mutate({ id: editingContent._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (content) => {
    toggleActiveMutation.mutate({
      id: content._id,
      isActive: !content.isActive
    });
  };

  const sectionOptions = sections?.map(section => ({
    value: section,
    label: section.charAt(0).toUpperCase() + section.slice(1)
  })) || [];

  const layoutOptions = [
    { value: 'default', label: 'Default' },
    { value: 'centered', label: 'Centered' },
    { value: 'left-aligned', label: 'Left Aligned' },
    { value: 'right-aligned', label: 'Right Aligned' },
    { value: 'grid', label: 'Grid Layout' },
    { value: 'card', label: 'Card Layout' }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Content Manager</h1>
        <Button
          onClick={() => {
            setEditingContent(null);
            setIsModalOpen(true);
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      <div className="flex space-x-4">
        <Select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          options={[
            { value: 'all', label: 'All Sections' },
            ...sectionOptions
          ]}
          className="w-48"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {contents?.map((content) => (
            <li key={content._id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {content.section}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {content.key}
                    </span>
                    {!content.isActive && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    {content.title && (
                      <p className="text-sm text-gray-900 font-medium">{content.title}</p>
                    )}
                    {content.subtitle && (
                      <p className="text-sm text-gray-600">{content.subtitle}</p>
                    )}
                    {content.content && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {content.content.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(content)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(content)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(content._id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContent(null);
          reset();
        }}
        title={editingContent ? 'Edit Content' : 'Add Content'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Section"
              required
              {...register('section')}
              error={errors.section?.message}
              options={sectionOptions}
            />
            <Input
              label="Key"
              required
              {...register('key')}
              error={errors.key?.message}
              helperText="Unique identifier for this content"
            />
          </div>

          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
          />

          <Input
            label="Subtitle"
            {...register('subtitle')}
            error={errors.subtitle?.message}
          />

          <Textarea
            label="Content"
            rows={4}
            {...register('content')}
            error={errors.content?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Image URL"
              type="url"
              {...register('imageUrl')}
              error={errors.imageUrl?.message}
            />
            <Select
              label="Layout"
              {...register('layout')}
              error={errors.layout?.message}
              options={layoutOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Button Text"
              {...register('buttonText')}
              error={errors.buttonText?.message}
            />
            <Input
              label="Button URL"
              {...register('buttonUrl')}
              error={errors.buttonUrl?.message}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Background Color"
              {...register('backgroundColor')}
              error={errors.backgroundColor?.message}
              helperText="CSS color value"
            />
            <Input
              label="Text Color"
              {...register('textColor')}
              error={errors.textColor?.message}
              helperText="CSS color value"
            />
            <Input
              label="Order"
              type="number"
              {...register('order', { valueAsNumber: true })}
              error={errors.order?.message}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isActive')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingContent(null);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
            >
              {editingContent ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ContentManager;