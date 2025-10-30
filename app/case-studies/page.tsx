'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CaseStudyItem {
  _id: string;
  title: string;
  content: string;
}

export default function CaseStudiesPage() {
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/caseStudy');
      console.log(response)
      if (response.status === 200) {
        const result = response.data;
        if (Array.isArray(result)) setItems(result);
        else if (Array.isArray(result?.data)) setItems(result.data);
        else setItems([]);
      } else {
        setError('Failed to load case studies');
        setItems([]);
      }
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to load case studies');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Case Studies</h1>
        <p className="mt-3 text-gray-600">Real examples of problems solved and outcomes delivered.</p>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-center text-gray-600">No case studies found.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{item.title}</h2>
              <div
                className="prose prose-sm text-gray-700 line-clamp-5 max-w-none"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}


