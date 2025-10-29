'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from '@/components/ui/customButtom/Button';
import CategoryModal from './categories/CategoryModal';
import ServiceModal from './serviceModel';

interface Service {
  _id: string;
  heroSection: {
    title: string;
    description: string;
  };
  content?: string;
  createdAt?: string;
}

export default function AdminServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/service');
      setServices(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load on mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      {/* Header Buttons */}
      <div className="flex gap-3 mb-6">
        <CustomButton text="Add Category" onClick={() => setIsModalOpen(true)} />
        <CustomButton text="Add Service" onClick={() => setOpen(true)} />
      </div>

      {/* Loading / Error / Empty */}
      {loading && <p className="text-gray-500">Loading services...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && services.length === 0 && (
        <p className="text-gray-500">No services found.</p>
      )}

      {/* ✅ Services Table */}
      {!loading && !error && services.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b font-semibold">{service.heroSection?.title}</td>
                  <td className="px-4 py-2 border-b text-gray-700">
                    {service.heroSection?.description || '—'}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-500">
                    {service.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          console.log('New category added');
        }}
      />

      {/* ✅ Service Modal */}
      <ServiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          console.log('Service added');
          fetchServices(); // 🔄 refresh list after adding
        }}
      />
    </div>
  );
}
