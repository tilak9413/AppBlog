'use client';

import { useState } from 'react';
import CustomButton from '@/components/ui/customButtom/Button';
import CategoryModal from './categories/CategoryModal';
import ServiceModal from './serviceModel';

export default function AdminServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false)

  return (
    <div className="p-6">
      <div className='flex' >
        <CustomButton text="Add Category" onClick={() => setIsModalOpen(true)} />
        <CustomButton text="Add service" onClick={() => setOpen(true)} />
      </div>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => console.log('New category added')}
      />
      <ServiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => console.log('Service added')}
      />
    </div>
  );
}
