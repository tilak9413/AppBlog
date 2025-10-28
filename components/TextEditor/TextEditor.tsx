'use client';

import React, { useEffect, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '@/types/api';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Card {
  id: string;
  title: string;
  description: string;
}

interface CardSection {
  id: string;
  sectionTitle: string;
  sectionDescription: string;
  cards: Card[];
}

interface HeroSection {
  title: string;
  description: string;
  image: string;
}

interface FormValues {
  categoryId: string;
  heroSection: HeroSection;
  cardSections: CardSection[];
  content: string;
}

const ServiceSchema = Yup.object().shape({
  categoryId: Yup.string().required('Category is required'),
  heroSection: Yup.object().shape({
    title: Yup.string().required('Hero title is required'),
    description: Yup.string().required('Hero description is required'),
  }),
  content: Yup.string().required('Content is required'),
});

export default function ServiceModal({ isOpen, onClose, onSuccess }: ServiceModalProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/service/categories').then((res) => {
        setCategories(res.data.data || []);
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4 sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-semibold text-gray-800">✨ Create New Service</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 transition text-xl"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="overflow-y-auto pr-2">
              <Formik<FormValues>
                initialValues={{
                  categoryId: '',
                  heroSection: { title: '', description: '', image: '' },
                  cardSections: [],
                  content: '',
                }}
                validationSchema={ServiceSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    await axios.post('/api/service', values);
                    onSuccess();
                    resetForm();
                    onClose();
                    router.refresh();
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form className="space-y-8">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Field
                        as="select"
                        name="categoryId"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Hero Section */}
                    <div className="p-5 bg-gray-50 rounded-xl border">
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Hero Section</h3>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Hero Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          id="hero-image"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setFieldValue('heroSection.image', reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor="hero-image"
                          className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                        >
                          <BiUpload size={18} />
                          Upload Image
                        </label>
                        {values.heroSection.image && (
                          <img
                            src={values.heroSection.image}
                            alt="Hero Preview"
                            className="mt-3 h-24 w-40 object-cover rounded-lg border"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <Field
                            name="heroSection.title"
                            type="text"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <ErrorMessage
                            name="heroSection.title"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <Field
                            as="textarea"
                            rows={3}
                            name="heroSection.description"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <ErrorMessage
                            name="heroSection.description"
                            component="p"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Sections */}
                    <div className="p-5 bg-gray-50 rounded-xl border">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-gray-800">Card Sections</h3>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue('cardSections', [
                              ...values.cardSections,
                              {
                                id: crypto.randomUUID(),
                                sectionTitle: '',
                                sectionDescription: '',
                                cards: [],
                              },
                            ])
                          }
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                          + Add Section
                        </button>
                      </div>

                      <AnimatePresence>
                        {values.cardSections.map((section, sIndex) => (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 mb-4 border rounded-lg bg-white shadow-sm"
                          >
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium text-gray-700">
                                Section {sIndex + 1}
                              </h4>
                              <button
                                type="button"
                                onClick={() =>
                                  setFieldValue(
                                    'cardSections',
                                    values.cardSections.filter((s) => s.id !== section.id)
                                  )
                                }
                                className="text-red-600 hover:bg-red-50 p-1 rounded transition"
                              >
                                <BsTrash2 size={16} />
                              </button>
                            </div>

                            <Field
                              name={`cardSections[${sIndex}].sectionTitle`}
                              placeholder="Section Title"
                              className="w-full mb-2 p-2 border rounded text-sm"
                            />
                            <Field
                              as="textarea"
                              name={`cardSections[${sIndex}].sectionDescription`}
                              placeholder="Section Description"
                              rows={2}
                              className="w-full mb-3 p-2 border rounded text-sm"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...values.cardSections];
                                updated[sIndex].cards.push({
                                  id: crypto.randomUUID(),
                                  title: '',
                                  description: '',
                                });
                                setFieldValue('cardSections', updated);
                              }}
                              className="text-blue-600 text-sm mb-2 hover:underline"
                            >
                              + Add Card
                            </button>

                            {section.cards.map((card, cIndex) => (
                              <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-2 border rounded mb-2"
                              >
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-600">
                                    Card {cIndex + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...values.cardSections];
                                      updated[sIndex].cards = updated[sIndex].cards.filter(
                                        (c) => c.id !== card.id
                                      );
                                      setFieldValue('cardSections', updated);
                                    }}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                                  >
                                    <BsTrash2 size={14} />
                                  </button>
                                </div>

                                <Field
                                  name={`cardSections[${sIndex}].cards[${cIndex}].title`}
                                  placeholder="Card Title"
                                  className="w-full p-2 border rounded text-sm mb-2"
                                />
                                <Field
                                  as="textarea"
                                  name={`cardSections[${sIndex}].cards[${cIndex}].description`}
                                  placeholder="Card Description"
                                  rows={2}
                                  className="w-full p-2 border rounded text-sm"
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Additional Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Content
                      </label>
                      <Field
                        as="textarea"
                        name="content"
                        rows={5}
                        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <ErrorMessage
                        name="content"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                      >
                        {isSubmitting ? 'Saving...' : 'Create Service'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
