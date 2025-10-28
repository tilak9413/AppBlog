'use client';
import { useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import CaseCard from './caseCard';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [ editdata , setEditdata  ]= useState([]);
  return (

    <>
    <CaseCard setIsModalOpen={setIsModalOpen} setEditdata={setEditdata}  />
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editdata={editdata}
        onSuccess={() => console.log('✅ Case study added successfully!')}
      />
    </>
  );
}
