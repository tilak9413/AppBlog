// app/admin/services/[id]/edit/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Service, ServiceCardSection, ServiceCategory } from '@/types/api';
import { BiUpload } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [formData, setFormData] = useState<Partial<Service>>({
    categoryId: '',
    heroSection: {
      image: '',
      title: '',
      description: ''
    },
    cardSections: [],
    content: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchService();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/service-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${params.id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 for simplicity (in production, upload to cloud storage)
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        heroSection: {
          ...prev.heroSection!,
          image: reader.result as string
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const addCardSection = () => {
    const newSection: ServiceCardSection = {
      id: Date.now().toString(),
      sectionTitle: '',
      sectionDescription: '',
      cards: []
    };
    
    setFormData(prev => ({
      ...prev,
      cardSections: [...(prev.cardSections || []), newSection]
    }));
  };

  const removeCardSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      cardSections: prev.cardSections?.filter(section => section.id !== sectionId)
    }));
  };

  const updateCardSection = (sectionId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      cardSections: prev.cardSections?.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const addCard = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      cardSections: prev.cardSections?.map(section =>
        section.id === sectionId
          ? {
              ...section,
              cards: [
                ...section.cards,
                {
                  id: Date.now().toString(),
                  title: '',
                  description: ''
                }
              ]
            }
          : section
      )
    }));
  };

  const removeCard = (sectionId: string, cardId: string) => {
    setFormData(prev => ({
      ...prev,
      cardSections: prev.cardSections?.map(section =>
        section.id === sectionId
          ? {
              ...section,
              cards: section.cards.filter(card => card.id !== cardId)
            }
          : section
      )
    }));
  };

  const updateCard = (sectionId: string, cardId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      cardSections: prev.cardSections?.map(section =>
        section.id === sectionId
          ? {
              ...section,
              cards: section.cards.map(card =>
                card.id === cardId ? { ...card, [field]: value } : card
              )
            }
          : section
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/services/${params.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/services');
      }
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? 'Edit Service' : 'Add New Service'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Category</h2>
          <select
            required
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="hero-image"
                />
                <label
                  htmlFor="hero-image"
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <BiUpload size={18} />
                  Upload Image
                </label>
                {formData.heroSection?.image && (
                  <img
                    src={formData.heroSection.image}
                    alt="Hero"
                    className="h-20 w-32 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.heroSection?.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection!, title: e.target.value }
                }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                required
                rows={3}
                value={formData.heroSection?.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  heroSection: { ...prev.heroSection!, description: e.target.value }
                }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Card Sections */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Card Sections</h2>
            <button
              type="button"
              onClick={addCardSection}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {/* <Plus size={18} /> */}
              Add Section
            </button>
          </div>

          <div className="space-y-6">
            {formData.cardSections?.map((section, sectionIndex) => (
              <div key={section.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">Section {sectionIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeCardSection(section.id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <BsTrash2 size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Section Title</label>
                    <input
                      type="text"
                      value={section.sectionTitle}
                      onChange={(e) => updateCardSection(section.id, 'sectionTitle', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Section Description</label>
                    <textarea
                      rows={2}
                      value={section.sectionDescription}
                      onChange={(e) => updateCardSection(section.id, 'sectionDescription', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Cards</label>
                      <button
                        type="button"
                        onClick={() => addCard(section.id)}
                        className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-sm"
                      >
                        Add Card
                      </button>
                    </div>

                    <div className="space-y-3">
                      {section.cards.map((card, cardIndex) => (
                        <div key={card.id} className="bg-white p-3 rounded border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">Card {cardIndex + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeCard(section.id, card.id)}
                              className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                              <BsTrash2 size={14} />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Card Title"
                              value={card.title}
                              onChange={(e) => updateCard(section.id, card.id, 'title', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <textarea
                              rows={2}
                              placeholder="Card Description"
                              value={card.description}
                              onChange={(e) => updateCard(section.id, card.id, 'description', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Additional Content</h2>
          <textarea
            rows={6}
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add any additional content here..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}