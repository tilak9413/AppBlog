import { ApiResponse, PaginatedResponse, Blog, Service, ContactFormData, NewsletterSubscriptionRequest, ServiceInquiryRequest } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// Blog API functions
export const blogApi = {
  // Get all blogs
  async getBlogs(params?: {
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Blog>> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/blogs${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<Blog[]>(endpoint);
  },

  // Get single blog
  async getBlog(id: number): Promise<ApiResponse<Blog>> {
    return apiCall<Blog>(`/api/blogs/${id}`);
  },

  // Create blog
  async createBlog(blogData: Partial<Blog>): Promise<ApiResponse<Blog>> {
    return apiCall<Blog>('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  // Update blog
  async updateBlog(id: number, blogData: Partial<Blog>): Promise<ApiResponse<Blog>> {
    return apiCall<Blog>(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  // Delete blog
  async deleteBlog(id: number): Promise<ApiResponse<void>> {
    return apiCall<void>(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  async submitContact(contactData: ContactFormData): Promise<ApiResponse<{ id: number; message: string }>> {
    return apiCall<{ id: number; message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  // Get contact submissions (admin)
  async getContactSubmissions(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/contact${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<any[]>(endpoint);
  },
};

// Newsletter API functions
export const newsletterApi = {
  // Subscribe to newsletter
  async subscribe(subscriptionData: NewsletterSubscriptionRequest): Promise<ApiResponse<any>> {
    return apiCall<any>('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  },

  // Unsubscribe from newsletter
  async unsubscribe(email: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/api/newsletter?email=${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });
  },

  // Get newsletter subscribers (admin)
  async getSubscribers(params?: {
    limit?: number;
    offset?: number;
    status?: 'all' | 'active' | 'unsubscribed';
  }): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.status) searchParams.set('status', params.status);

    const queryString = searchParams.toString();
    const endpoint = `/api/newsletter${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<any[]>(endpoint);
  },
};

// Service API functions
export const serviceApi = {
  // Get all services
  async getServices(params?: {
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Service>> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/services${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<Service[]>(endpoint);
  },

  // Create service
  async createService(serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    return apiCall<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },
};

// Service Inquiry API functions
export const serviceInquiryApi = {
  // Submit service inquiry
  async submitInquiry(inquiryData: ServiceInquiryRequest): Promise<ApiResponse<{ id: number; message: string }>> {
    return apiCall<{ id: number; message: string }>('/api/service-inquiry', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  // Get service inquiries (admin)
  async getInquiries(params?: {
    limit?: number;
    offset?: number;
    status?: 'all' | 'new' | 'contacted' | 'quoted' | 'closed';
  }): Promise<PaginatedResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.status) searchParams.set('status', params.status);

    const queryString = searchParams.toString();
    const endpoint = `/api/service-inquiry${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<any[]>(endpoint);
  },
};

// Export all API functions
export const api = {
  blog: blogApi,
  contact: contactApi,
  newsletter: newsletterApi,
  service: serviceApi,
  serviceInquiry: serviceInquiryApi,
};
