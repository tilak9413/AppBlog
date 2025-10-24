// API Response Types

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

// Blog Types
export interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  imageUrl: string;
  author: string;
  authorRole: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogRequest {
  title: string;
  category: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
  readingTime?: string;
  published?: boolean;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  id: number;
}

// Contact Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  companyWebsite?: string;
  email: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
}

export interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  companyWebsite?: string;
  email: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
  submittedAt: string;
  status: 'new' | 'contacted' | 'closed';
}

// Newsletter Types
export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  preferences?: {
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

export interface NewsletterSubscriptionRequest {
  email: string;
  preferences?: {
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

// Service Types
export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  pricing: {
    starting: string;
    type: 'monthly' | 'hourly' | 'per_return' | 'per_employee' | 'custom';
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  icon?: string;
  category: string;
  features?: string[];
  pricing?: {
    starting: string;
    type: 'monthly' | 'hourly' | 'per_return' | 'per_employee' | 'custom';
  };
  isActive?: boolean;
}

// Service Inquiry Types
export interface ServiceInquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceId: number;
  serviceName: string;
  message: string;
  budget?: string;
  timeline?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  submittedAt: string;
  contactedAt?: string;
}

export interface ServiceInquiryRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceId: number;
  serviceName?: string;
  message: string;
  budget?: string;
  timeline?: string;
}

// API Error Types
export interface ApiError {
  success: false;
  error: string;
  details?: any;
}

// Query Parameters
export interface BlogQueryParams {
  category?: string;
  limit?: number;
  offset?: number;
}

export interface ServiceQueryParams {
  category?: string;
  limit?: number;
  offset?: number;
}

export interface ContactQueryParams {
  limit?: number;
  offset?: number;
}

export interface NewsletterQueryParams {
  limit?: number;
  offset?: number;
  status?: 'all' | 'active' | 'unsubscribed';
}

export interface ServiceInquiryQueryParams {
  limit?: number;
  offset?: number;
  status?: 'all' | 'new' | 'contacted' | 'quoted' | 'closed';
}
