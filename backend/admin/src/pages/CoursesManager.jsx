import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PencilIcon, TrashIcon, PlusIcon, StarIcon, EyeIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../contexts/AuthContext';

const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.enum(['car', 'motorcycle', 'truck', 'bus'], {
    errorMap: () => ({ message: 'Please select a valid category' })
  }),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().optional(),
  duration: z.string().min(1, 'Duration is required'),
  lessons: z.number().min(1, 'Number of lessons is required'),
  requirements: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional().or(z.literal('')),
  gallery: z.array(z.string()).default([]),
  instructor: z.string().optional(),
  maxStudents: z.number().min(1, 'Max students must be at least 1').default(10),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
});

const CoursesManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses', selectedCategory],
    queryFn: () => api.get(`/api/courses${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`).then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/api/courses', data),
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      setIsModalOpen(false);
      reset();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/courses/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      setIsModalOpen(false);
      setEditingCourse(null);
      reset();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }) => api.patch(`/api/courses/${id}/toggle-active`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
    }
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: ({ id, isFeatured }) => api.patch(`/api/courses/${id}/toggle-featured`, { isFeatured }),
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: editingCourse || {
      isActive: true,
      isFeatured: false,
      difficulty: 'beginner',
      maxStudents: 10,
      requirements: [],
      features: [],
      gallery: []
    }
  });

  const watchName = watch('name');

  React.useEffect(() => {
    if (watchName && !editingCourse) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [watchName, editingCourse, setValue]);

  React.useEffect(() => {
    if (editingCourse) {
      reset(editingCourse);
    } else {
      reset({
        isActive: true,
        isFeatured: false,
        difficulty: 'beginner',
        maxStudents: 10,
        requirements: [],
        features: [],
        gallery: []
      });
    }
  }, [editingCourse, reset]);

  const onSubmit = (data) => {
    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (course) => {
    toggleActiveMutation.mutate({
      id: course._id,
      isActive: !course.isActive
    });
  };

  const handleToggleFeatured = (course) => {
    toggleFeaturedMutation.mutate({
      id: course._id,
      isFeatured: !course.isFeatured
    });
  };

  const categoryOptions = [
    { value: 'car', label: 'Car' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'truck', label: 'Truck' },
    { value: 'bus', label: 'Bus' }
  ];

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
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
        <h1 className="text-2xl font-bold text-gray-900">Courses Manager</h1>
        <Button
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="flex space-x-4">
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={[
            { value: 'all', label: 'All Categories' },
            ...categoryOptions
          ]}
          className="w-48"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {course.imageUrl && (
              <img
                src={course.imageUrl}
                alt={course.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {course.category}
                </span>
                <div className="flex items-center space-x-1">
                  {course.isFeatured && (
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                  {!course.isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
              
              {course.shortDescription && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.shortDescription}
                </p>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">
                    CHF {course.price}
                  </span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-sm text-gray-500 line-through">
                      CHF {course.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.lessons} lessons</span>
                <span>{course.difficulty}</span>
                <span>Max {course.maxStudents}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleActive(course)}
                  title={course.isActive ? 'Deactivate' : 'Activate'}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFeatured(course)}
                  title={course.isFeatured ? 'Remove from featured' : 'Add to featured'}
                >
                  <StarIcon className={`h-4 w-4 ${course.isFeatured ? 'text-yellow-500 fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(course)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(course._id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
          reset();
        }}
        title={editingCourse ? 'Edit Course' : 'Add Course'}
        size="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Course Name"
              required
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Slug"
              required
              {...register('slug')}
              error={errors.slug?.message}
              helperText="URL-friendly version of the name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              required
              {...register('category')}
              error={errors.category?.message}
              options={categoryOptions}
            />
            <Select
              label="Difficulty"
              {...register('difficulty')}
              error={errors.difficulty?.message}
              options={difficultyOptions}
            />
          </div>

          <Textarea
            label="Short Description"
            rows={2}
            {...register('shortDescription')}
            error={errors.shortDescription?.message}
            helperText="Brief description for course cards"
          />

          <Textarea
            label="Full Description"
            rows={4}
            required
            {...register('description')}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Price (CHF)"
              type="number"
              step="0.01"
              required
              {...register('price', { valueAsNumber: true })}
              error={errors.price?.message}
            />
            <Input
              label="Original Price (CHF)"
              type="number"
              step="0.01"
              {...register('originalPrice', { valueAsNumber: true })}
              error={errors.originalPrice?.message}
              helperText="For showing discounts"
            />
            <Input
              label="Duration"
              required
              {...register('duration')}
              error={errors.duration?.message}
              helperText="e.g., '2 weeks', '1 month'"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Number of Lessons"
              type="number"
              required
              {...register('lessons', { valueAsNumber: true })}
              error={errors.lessons?.message}
            />
            <Input
              label="Max Students"
              type="number"
              {...register('maxStudents', { valueAsNumber: true })}
              error={errors.maxStudents?.message}
            />
            <Input
              label="Instructor"
              {...register('instructor')}
              error={errors.instructor?.message}
            />
          </div>

          <Input
            label="Course Image URL"
            type="url"
            {...register('imageUrl')}
            error={errors.imageUrl?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Meta Title"
              {...register('metaTitle')}
              error={errors.metaTitle?.message}
              helperText="SEO title for search engines"
            />
            <Input
              label="Meta Description"
              {...register('metaDescription')}
              error={errors.metaDescription?.message}
              helperText="SEO description for search engines"
            />
          </div>

          <div className="flex items-center space-x-6">
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
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isFeatured')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Featured
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingCourse(null);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
            >
              {editingCourse ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CoursesManager;