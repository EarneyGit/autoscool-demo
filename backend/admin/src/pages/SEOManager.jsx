import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  TagIcon,
  LinkIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';

// Enhanced SEO form schema for AutoScool
const seoSchema = z.object({
  page: z.string().min(1, 'Page is required'),
  title: z.string().min(1, 'Title is required').max(60, 'Title should be under 60 characters'),
  description: z.string().min(1, 'Description is required').max(160, 'Description should be under 160 characters'),
  keywords: z.string().optional(),
  canonicalUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().url('Invalid URL').optional().or(z.literal('')),
  structuredData: z.object({
    organization: z.object({
      name: z.string().default('AutoScool'),
      url: z.string().url('Invalid URL').optional().or(z.literal('')),
      logo: z.string().url('Invalid URL').optional().or(z.literal('')),
      contactPoint: z.object({
        telephone: z.string().optional(),
        contactType: z.string().default('customer service'),
        email: z.string().email('Invalid email').optional().or(z.literal(''))
      }).optional()
    }).optional(),
    localBusiness: z.object({
      name: z.string().default('AutoScool'),
      address: z.object({
        streetAddress: z.string().optional(),
        addressLocality: z.string().default('Genève'),
        postalCode: z.string().optional(),
        addressCountry: z.string().default('CH')
      }).optional(),
      geo: z.object({
        latitude: z.number().optional(),
        longitude: z.number().optional()
      }).optional(),
      openingHours: z.array(z.string()).optional(),
      priceRange: z.string().optional(),
      aggregateRating: z.object({
        ratingValue: z.number().min(1).max(5).optional(),
        reviewCount: z.number().optional()
      }).optional()
    }).optional(),
    course: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      provider: z.string().default('AutoScool'),
      courseMode: z.string().optional(),
      duration: z.string().optional(),
      price: z.number().optional(),
      category: z.string().optional()
    }).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    breadcrumb: z.array(z.object({
      name: z.string(),
      url: z.string().url('Invalid URL')
    })).optional()
  }).optional(),
  robots: z.object({
    index: z.boolean().default(true),
    follow: z.boolean().default(true),
    archive: z.boolean().default(true),
    snippet: z.boolean().default(true),
    imageindex: z.boolean().default(true)
  }).optional(),
  hreflang: z.array(z.object({
    lang: z.string(),
    url: z.string().url('Invalid URL')
  })).optional(),
  priority: z.number().min(0).max(1).default(0.5),
  changeFreq: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).default('weekly'),
  // AutoScool specific fields
  targetKeywords: z.array(z.string()).optional(),
  localArea: z.string().optional(),
  competitorAnalysis: z.object({
    competitors: z.array(z.string()).optional(),
    targetRanking: z.number().min(1).max(10).optional()
  }).optional()
});

// Enhanced page options for AutoScool
const pageOptions = [
  { value: 'home', label: 'Accueil - AutoScool Genève' },
  { value: 'about', label: 'À propos - AutoScool' },
  { value: 'courses', label: 'Cours de conduite' },
  { value: 'courses-car', label: 'Permis voiture' },
  { value: 'courses-motorcycle', label: 'Permis moto' },
  { value: 'sensibilisation', label: 'Cours sensibilisation' },
  { value: 'premiers-secours', label: 'Premiers secours' },
  { value: 'packages', label: 'Forfaits AutoScool' },
  { value: 'contact', label: 'Contact AutoScool' },
  { value: 'blog', label: 'Blog AutoScool' },
  { value: 'locations-plainpalais', label: 'AutoScool Plainpalais' },
  { value: 'locations-cornavin', label: 'AutoScool Cornavin' },
  { value: 'locations-carouge', label: 'AutoScool Carouge' },
  { value: 'locations-meyrin', label: 'AutoScool Meyrin' }
];

// Geneva-specific target keywords for AutoScool
const targetKeywords = [
  'auto école Genève',
  'permis conduire Genève',
  'cours conduite Genève',
  'moniteur conduite Genève',
  'AutoScool Genève',
  'école conduite Suisse',
  'permis voiture Genève',
  'leçons conduite Genève',
  'auto école Plainpalais',
  'auto école Cornavin',
  'sensibilisation routière Genève',
  'premiers secours Genève',
  'code de la route Suisse'
];

const changeFreqOptions = [
  { value: 'always', label: 'Always' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'never', label: 'Never' }
];

const genevaAreas = [
  'Plainpalais',
  'Cornavin',
  'Carouge',
  'Meyrin',
  'Vernier',
  'Lancy',
  'Onex',
  'Thônex',
  'Chêne-Bougeries',
  'Vandœuvres'
];

const SEOManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSEO, setEditingSEO] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [keywordAnalysis, setKeywordAnalysis] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  
  const queryClient = useQueryClient();

  // Fetch SEO data
  const { data: seoData, isLoading, error, refetch } = useQuery({
    queryKey: ['seo'],
    queryFn: async () => {
      const response = await axios.get('/seo');
      return response.data.data;
    }
  });

  // Fetch SEO performance data
  const { data: performanceMetrics } = useQuery({
    queryKey: ['seo-performance'],
    queryFn: async () => {
      const response = await axios.get('/seo/performance');
      return response.data.data;
    },
    refetchInterval: 300000 // Refresh every 5 minutes
  });

  // Fetch keyword rankings
  const { data: keywordRankings } = useQuery({
    queryKey: ['keyword-rankings'],
    queryFn: async () => {
      const response = await axios.get('/seo/keywords/rankings');
      return response.data.data;
    },
    refetchInterval: 3600000 // Refresh every hour
  });

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      robots: {
        index: true,
        follow: true,
        archive: true,
        snippet: true,
        imageindex: true
      },
      priority: 0.5,
      changeFreq: 'weekly',
      targetKeywords: [],
      structuredData: {
        organization: {
          name: 'AutoScool'
        },
        localBusiness: {
          name: 'AutoScool',
          address: {
            addressLocality: 'Genève',
            addressCountry: 'CH'
          }
        }
      }
    }
  });

  // Watch form values for preview
  const watchedValues = watch();

  // Create/Update SEO mutation
  const seoMutation = useMutation({
    mutationFn: async (data) => {
      if (editingSEO) {
        const response = await axios.put(`/api/seo/${editingSEO._id}`, data);
        return response.data;
      } else {
        const response = await axios.post('/api/seo', data);
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seo']);
      toast.success(editingSEO ? 'SEO updated successfully' : 'SEO created successfully');
      setIsModalOpen(false);
      setEditingSEO(null);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  });

  // Delete SEO mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/seo/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seo']);
      toast.success('SEO deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  });

  // Generate sitemap mutation
  const generateSitemapMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/seo/generate-sitemap');
      return response.data;
    },
    onSuccess: () => {
      toast.success('Sitemap generated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to generate sitemap');
    }
  });

  // Keyword analysis mutation
  const keywordAnalysisMutation = useMutation({
    mutationFn: async (keywords) => {
      const response = await axios.post('/seo/analyze-keywords', { keywords });
      return response.data;
    },
    onSuccess: (data) => {
      setKeywordAnalysis(data.data);
      toast.success('Keyword analysis completed');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to analyze keywords');
    }
  });

  // Technical SEO audit mutation
  const technicalAuditMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/seo/technical-audit');
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Technical SEO audit completed');
      queryClient.invalidateQueries(['seo-performance']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to run technical audit');
    }
  });

  const handleEdit = (seo) => {
    setEditingSEO(seo);
    reset(seo);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this SEO configuration?')) {
      deleteMutation.mutate(id);
    }
  };

  const handlePreview = (seo) => {
    setPreviewData(seo);
    setIsPreviewOpen(true);
  };

  const onSubmit = (data) => {
    seoMutation.mutate(data);
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: ChartBarIcon },
    { id: 'basic', name: 'SEO de base', icon: DocumentTextIcon },
    { id: 'keywords', name: 'Mots-clés', icon: TagIcon },
    { id: 'local', name: 'SEO Local', icon: MapPinIcon },
    { id: 'social', name: 'Réseaux sociaux', icon: GlobeAltIcon },
    { id: 'schema', name: 'Données structurées', icon: CogIcon },
    { id: 'technical', name: 'Technique', icon: BuildingOfficeIcon },
    { id: 'performance', name: 'Performance', icon: ArrowTrendingUpIcon }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading SEO data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Manager - AutoScool</h1>
          <p className="text-gray-600">Gérez le référencement et optimisez la visibilité d'AutoScool sur Google</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => technicalAuditMutation.mutate()}
            variant="outline"
            disabled={technicalAuditMutation.isLoading}
            className="flex items-center space-x-2"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
            <span>{technicalAuditMutation.isLoading ? 'Audit en cours...' : 'Audit technique'}</span>
          </Button>
          <Button
            onClick={() => generateSitemapMutation.mutate()}
            variant="outline"
            disabled={generateSitemapMutation.isLoading}
          >
            {generateSitemapMutation.isLoading ? 'Génération...' : 'Générer Sitemap'}
          </Button>
          <Button
            onClick={() => {
              setEditingSEO(null);
              reset();
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Ajouter SEO</span>
          </Button>
        </div>
      </div>

      {/* Performance Dashboard */}
      {performanceMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Trafic organique</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {performanceMetrics.organicTraffic || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TagIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Mots-clés classés</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {performanceMetrics.rankedKeywords || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <StarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Position moyenne</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {performanceMetrics.averagePosition || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vitesse de chargement</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {performanceMetrics.pageSpeed || 0}s
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyword Rankings */}
      {keywordRankings && keywordRankings.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Classement des mots-clés AutoScool</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keywordRankings.slice(0, 6).map((keyword, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{keyword.term}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      keyword.position <= 3 ? 'bg-green-100 text-green-800' :
                      keyword.position <= 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      #{keyword.position}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{keyword.searchVolume} recherches/mois</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Configurations SEO</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {seoData?.length === 0 ? (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune configuration SEO</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par créer votre première configuration SEO.</p>
            </div>
          ) : (
            seoData?.map((seo) => (
              <div key={seo._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {pageOptions.find(p => p.value === seo.page)?.label || seo.page}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        seo.robots?.index ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {seo.robots?.index ? 'Indexé' : 'Non indexé'}
                      </span>
                      {seo.localArea && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {seo.localArea}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">{seo.title}</p>
                    <p className="mt-1 text-xs text-gray-500 truncate">{seo.description}</p>
                    {seo.targetKeywords && seo.targetKeywords.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {seo.targetKeywords.slice(0, 3).map((keyword, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {keyword}
                          </span>
                        ))}
                        {seo.targetKeywords.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{seo.targetKeywords.length - 3} autres
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handlePreview(seo)}
                      variant="outline"
                      size="sm"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleEdit(seo)}
                      variant="outline"
                      size="sm"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(seo._id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Enhanced SEO Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSEO(null);
          reset();
        }}
        title={editingSEO ? 'Modifier la configuration SEO' : 'Ajouter une configuration SEO'}
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Guide SEO AutoScool</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Utilisez "AutoScool" dans tous les titres et descriptions</li>
                    <li>• Ciblez les mots-clés locaux : "auto école Genève", "permis conduire Genève"</li>
                    <li>• Optimisez pour les quartiers : Plainpalais, Cornavin, Carouge</li>
                    <li>• Incluez les services : sensibilisation, premiers secours</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900">Mots-clés prioritaires</h4>
                    <div className="mt-2 space-y-1">
                      {targetKeywords.slice(0, 5).map((keyword, index) => (
                        <span key={index} className="block text-sm text-green-800">{keyword}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900">Zones géographiques</h4>
                    <div className="mt-2 space-y-1">
                      {genevaAreas.slice(0, 5).map((area, index) => (
                        <span key={index} className="block text-sm text-yellow-800">{area}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'basic' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="page"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Page"
                        options={pageOptions}
                        error={errors.page?.message}
                        {...field}
                      />
                    )}
                  />
                  
                  <Controller
                    name="localArea"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Zone géographique"
                        options={genevaAreas.map(area => ({ value: area, label: area }))}
                        error={errors.localArea?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
                
                <Input
                  label="Titre SEO (incluez AutoScool)"
                  placeholder="AutoScool – Votre auto-école à Genève | permis conduire Genève"
                  error={errors.title?.message}
                  {...register('title')}
                />
                
                <Textarea
                  label="Meta description (incluez AutoScool)"
                  placeholder="AutoScool à Genève propose cours de conduite, sensibilisation et premiers secours. Inscrivez-vous pour réussir votre permis du premier coup."
                  rows={3}
                  error={errors.description?.message}
                  {...register('description')}
                />
                
                <Input
                  label="Mots-clés (séparés par des virgules)"
                  placeholder="auto école Genève, permis conduire Genève, AutoScool"
                  error={errors.keywords?.message}
                  {...register('keywords')}
                />
                
                <Input
                  label="URL canonique"
                  placeholder="https://autoscool.ch/page"
                  error={errors.canonicalUrl?.message}
                  {...register('canonicalUrl')}
                />
              </>
            )}

            {activeTab === 'keywords' && (
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analyse des mots-clés</h3>
                  <Button
                    type="button"
                    onClick={() => keywordAnalysisMutation.mutate(targetKeywords)}
                    disabled={keywordAnalysisMutation.isLoading}
                    className="mb-4"
                  >
                    {keywordAnalysisMutation.isLoading ? 'Analyse en cours...' : 'Analyser les mots-clés'}
                  </Button>
                  
                  {keywordAnalysis && (
                    <div className="mt-4 space-y-2">
                      {keywordAnalysis.map((keyword, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                          <span className="font-medium">{keyword.term}</span>
                          <div className="flex space-x-2">
                            <span className="text-sm text-gray-500">Vol: {keyword.volume}</span>
                            <span className="text-sm text-gray-500">Diff: {keyword.difficulty}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Mots-clés cibles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {targetKeywords.map((keyword, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={keyword}
                          {...register('targetKeywords')}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{keyword}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'local' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">SEO Local AutoScool</h3>
                  <p className="text-sm text-blue-800">Optimisez votre présence locale à Genève</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nom de l'entreprise"
                    defaultValue="AutoScool"
                    {...register('structuredData.localBusiness.name')}
                  />
                  
                  <Input
                    label="Adresse"
                    placeholder="Rue de la Paix 1"
                    {...register('structuredData.localBusiness.address.streetAddress')}
                  />
                  
                  <Input
                    label="Code postal"
                    placeholder="1200"
                    {...register('structuredData.localBusiness.address.postalCode')}
                  />
                  
                  <Input
                    label="Téléphone"
                    placeholder="+41 22 123 45 67"
                    {...register('structuredData.organization.contactPoint.telephone')}
                  />
                  
                  <Input
                    label="Latitude"
                    placeholder="46.2044"
                    type="number"
                    step="any"
                    {...register('structuredData.localBusiness.geo.latitude', { valueAsNumber: true })}
                  />
                  
                  <Input
                    label="Longitude"
                    placeholder="6.1432"
                    type="number"
                    step="any"
                    {...register('structuredData.localBusiness.geo.longitude', { valueAsNumber: true })}
                  />
                </div>
                
                <Textarea
                  label="Horaires d'ouverture (un par ligne)"
                  placeholder="Lundi: 08:00-18:00\nMardi: 08:00-18:00"
                  rows={4}
                  {...register('structuredData.localBusiness.openingHours')}
                />
                
                <Input
                  label="Gamme de prix"
                  placeholder="CHF 80-120"
                  {...register('structuredData.localBusiness.priceRange')}
                />
              </div>
            )}

            {activeTab === 'social' && (
              <>
                <h3 className="text-lg font-medium text-gray-900">Réseaux sociaux</h3>
                
                <Input
                  label="Titre Open Graph"
                  placeholder="AutoScool - École de conduite à Genève"
                  error={errors.ogTitle?.message}
                  {...register('ogTitle')}
                />
                
                <Textarea
                  label="Description Open Graph"
                  placeholder="Apprenez à conduire avec AutoScool, l'école de conduite de référence à Genève."
                  rows={3}
                  error={errors.ogDescription?.message}
                  {...register('ogDescription')}
                />
                
                <Input
                  label="Image Open Graph"
                  placeholder="https://autoscool.ch/images/og-image.jpg"
                  error={errors.ogImage?.message}
                  {...register('ogImage')}
                />
                
                <Input
                  label="Titre Twitter"
                  placeholder="AutoScool - École de conduite à Genève"
                  error={errors.twitterTitle?.message}
                  {...register('twitterTitle')}
                />
                
                <Textarea
                  label="Description Twitter"
                  placeholder="Apprenez à conduire avec AutoScool, l'école de conduite de référence à Genève."
                  rows={3}
                  error={errors.twitterDescription?.message}
                  {...register('twitterDescription')}
                />
                
                <Input
                  label="Image Twitter"
                  placeholder="https://autoscool.ch/images/twitter-image.jpg"
                  error={errors.twitterImage?.message}
                  {...register('twitterImage')}
                />
              </>
            )}

            {activeTab === 'schema' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Données structurées</h3>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900">Organisation AutoScool</h4>
                  <div className="mt-2 space-y-2">
                    <Input
                      label="URL du site"
                      placeholder="https://autoscool.ch"
                      {...register('structuredData.organization.url')}
                    />
                    <Input
                      label="Logo"
                      placeholder="https://autoscool.ch/logo.png"
                      {...register('structuredData.organization.logo')}
                    />
                    <Input
                      label="Email de contact"
                      placeholder="contact@autoscool.ch"
                      {...register('structuredData.organization.contactPoint.email')}
                    />
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Cours AutoScool</h4>
                  <div className="mt-2 space-y-2">
                    <Input
                      label="Nom du cours"
                      placeholder="Cours de conduite AutoScool"
                      {...register('structuredData.course.name')}
                    />
                    <Textarea
                      label="Description du cours"
                      placeholder="Cours de conduite complet avec AutoScool à Genève"
                      rows={2}
                      {...register('structuredData.course.description')}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Durée"
                        placeholder="P1M"
                        {...register('structuredData.course.duration')}
                      />
                      <Input
                        label="Prix (CHF)"
                        type="number"
                        placeholder="1200"
                        {...register('structuredData.course.price', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <>
                <h3 className="text-lg font-medium text-gray-900">SEO Technique</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Directives robots</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register('robots.index')}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Index</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register('robots.follow')}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Follow</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register('robots.archive')}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Archive</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register('robots.snippet')}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Snippet</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Priorité (0-1)"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      error={errors.priority?.message}
                      {...register('priority', { valueAsNumber: true })}
                    />
                    
                    <Controller
                      name="changeFreq"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Fréquence de changement"
                          options={changeFreqOptions}
                          error={errors.changeFreq?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Suivi des performances</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Analyse concurrentielle</h4>
                  <div className="mt-2 space-y-2">
                    <Textarea
                      label="Concurrents (un par ligne)"
                      placeholder="ecole-conduite-geneve.ch\nautre-concurrent.ch"
                      rows={3}
                      {...register('competitorAnalysis.competitors')}
                    />
                    <Input
                      label="Position cible (1-10)"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="3"
                      {...register('competitorAnalysis.targetRanking', { valueAsNumber: true })}
                    />
                  </div>
                </div>
                
                {performanceMetrics && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900">Métriques actuelles</h4>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-800">Trafic organique:</span>
                        <span className="ml-2 font-medium">{performanceMetrics.organicTraffic}</span>
                      </div>
                      <div>
                        <span className="text-green-800">Position moyenne:</span>
                        <span className="ml-2 font-medium">{performanceMetrics.averagePosition}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingSEO(null);
                reset();
              }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : (editingSEO ? 'Mettre à jour' : 'Créer')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Aperçu SEO"
        size="lg"
      >
        {previewData && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer">
                {previewData.title}
              </h3>
              <p className="text-green-600 text-sm mt-1">
                https://autoscool.ch/{previewData.page}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {previewData.description}
              </p>
            </div>
            
            {previewData.targetKeywords && previewData.targetKeywords.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Mots-clés cibles:</h4>
                <div className="flex flex-wrap gap-2">
                  {previewData.targetKeywords.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {previewData.structuredData && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Données structurées:</h4>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(previewData.structuredData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SEOManager;