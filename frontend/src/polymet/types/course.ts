export interface CoursePrice {
  amount: number;
  currency: string;
  discountPrice?: number;
  priceNote?: string;
}

export interface CourseInstructor {
  name: string;
  bio?: string;
  image?: string;
  experience?: string;
  specializations?: string[];
}

export interface CourseSchedule {
  startDate: Date;
  endDate: Date;
  days: string[];
  timeSlots: string[];
  location?: string;
}

export interface CourseCurriculum {
  module: string;
  topics: string[];
  duration: string;
  description?: string;
}

export interface Course {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription?: string;
  price: CoursePrice;
  duration: string;
  requirements: string[];
  inclusions: string[];
  features: string[];
  curriculum: CourseCurriculum[];
  images: string[];
  instructor: CourseInstructor;
  schedule: CourseSchedule[];
  capacity: {
    min: number;
    max: number;
    current: number;
  };
  active: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: string;
  featured?: boolean;
  search?: string;
}