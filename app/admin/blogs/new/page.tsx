'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import ComponentLoader from '@/components/ComponentLoader';

// Validation schema
const BlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  excerpt: Yup.string().required('Excerpt is required'),
  content: Yup.string().required('Content is required'),
  author: Yup.string().required('Author is required'),
  tags: Yup.string().optional(),
  published: Yup.boolean().required(),
  image: Yup.mixed().nullable(),
});

const statusOptions = [
  { value: true, label: 'Published' },
  { value: false, label: 'Draft' },
];

export default function NewBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue('image', reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError('');

    try {
      const tagsArray = values.tags ? values.tags.split(',').map((t: string) => t.trim()) : [];

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, tags: tagsArray }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog');
      }

      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Formik
        initialValues={{
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          author: '',
          image: '',
          tags: '',
          published: true,
        }}
        validationSchema={BlogSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Title</label>
              <Field
                name="title"
                type="text"
                onBlur={() => {
                  if (!values.slug) setFieldValue('slug', generateSlug(values.title));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Slug */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Slug</label>
              <div className="flex gap-2">
                <Field
                  name="slug"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setFieldValue('slug', generateSlug(values.title))}
                  className="bg-gray-200 px-3 py-2 rounded-md"
                >
                  Generate
                </button>
              </div>
              <ErrorMessage name="slug" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Excerpt</label>
              <Field
                as="textarea"
                name="excerpt"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="excerpt" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Content */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Content</label>
              <Field
                as="textarea"
                name="content"
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="content" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Author */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Author</label>
              <Field
                name="author"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="author" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="w-full"
              />
              {values.image && (
                <img
                  src={values.image}
                  alt="preview"
                  className="mt-2 w-48 h-32 object-cover rounded"
                />
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <Field
                name="tags"
                type="text"
                placeholder="tag1, tag2, tag3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Status using react-select */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Status</label>
              <Select
                options={statusOptions}
                value={statusOptions.find(option => option.value === values.published)}
                onChange={(option: any) => setFieldValue('published', option.value)}
              />
              <ErrorMessage name="published" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {loading ? <ComponentLoader height="h-5" message="Creating..." /> : 'Create Blog'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
