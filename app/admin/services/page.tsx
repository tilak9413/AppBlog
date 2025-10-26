// app/admin/services/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiChevronDown, BiChevronRight, BiEdit } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { ServiceCategory } from '@/types/api';

export default function AdminServices() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/service-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category and all its services?')) return;
    
    try {
      const response = await fetch(`/api/service-categories/${categoryId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteService = async (categoryId: string, serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
        <div className="space-x-3">
          <Link 
            href="/admin/services/categories/new" 
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {/* <Plus size={20} /> */}
            Add Category
          </Link>
          <Link 
            href="/admin/services/new" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {/* <Plus size={20} /> */}
            Add Service
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No service categories found</p>
            <Link 
              href="/admin/services/categories/new"
              className="text-blue-600 hover:underline"
            >
              Create your first category
            </Link>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {expandedCategories.includes(category.id) ? 
                        <BiChevronDown size={20} /> : 
                        <BiChevronRight size={20} />
                      }
                    </button>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/services/categories/${category.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <BiEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <BsTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {expandedCategories.includes(category.id) && (
                <div className="p-4">
                  {category.services.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No services in this category</p>
                  ) : (
                    <div className="space-y-3">
                      {category.services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <h3 className="font-medium text-gray-800">{service.heroSection.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{service.heroSection.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/services/${service.id}/edit`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <BiEdit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteService(category.id, service.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <BsTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}