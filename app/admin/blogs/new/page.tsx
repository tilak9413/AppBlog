'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { AnimatePresence, motion } from 'framer-motion';
import ComponentLoader from '@/components/ComponentLoader';
import { RichTextEditor } from '@/components/RichTextEditor';

type NewBlogModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

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

export default function NewBlogModal({ open, onClose, onCreated }: NewBlogModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.body.classList.add('overflow-hidden');
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
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

      onCreated?.();
      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />

          {/* Modal container */}
          <div className="relative z-[55] flex min-h-full items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-blog-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-xl bg-white shadow-2xl flex flex-col"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.9 }}
            >
              {/* Header (fixed) */}
              <div className="shrink-0 flex items-center justify-between border-b px-6 py-4">
                <h2 id="new-blog-title" className="text-xl font-semibold">
                  Create New Blog
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Body (scrollable) */}
              <div className="flex-1 overflow-y-auto p-6">
                {error && (
                  <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
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
                    <Form id="new-blog-form" className="space-y-4">
                      {/* Title */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Title</label>
                        <Field
                          name="title"
                          type="text"
                          onBlur={() => {
                            if (!values.slug) setFieldValue('slug', generateSlug(values.title));
                          }}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Slug */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Slug</label>
                        <div className="flex gap-2">
                          <Field
                            name="slug"
                            type="text"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                          <button
                            type="button"
                            onClick={() => setFieldValue('slug', generateSlug(values.title))}
                            className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300"
                          >
                            Generate
                          </button>
                        </div>
                        <ErrorMessage name="slug" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Excerpt */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Excerpt</label>
                        <Field
                          as="textarea"
                          name="excerpt"
                          rows={2}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <ErrorMessage name="excerpt" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Content */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Content</label>
                        <div className="rounded-md border border-gray-300">
                          <RichTextEditor
                            value={values.content}
                            onChange={(html: string) => setFieldValue('content', html)}
                            onBlur={() => setFieldValue('content', values.content)}
                            placeholder="Write your post..."
                          />
                        </div>
                        <ErrorMessage name="content" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Author */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Author</label>
                        <Field
                          name="author"
                          type="text"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <ErrorMessage name="author" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                          className="w-full text-sm"
                        />
                        {values.image && (
                          <img
                            src={values.image}
                            alt="preview"
                            className="mt-2 h-32 w-48 rounded object-cover"
                          />
                        )}
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Tags (comma separated)</label>
                        <Field
                          name="tags"
                          type="text"
                          placeholder="tag1, tag2, tag3"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>

                      {/* Status using react-select */}
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">Status</label>
                        <Select
                          options={statusOptions}
                          value={statusOptions.find((o) => o.value === values.published)}
                          onChange={(option: any) => setFieldValue('published', option.value)}
                          menuPortalTarget={mounted ? document.body : undefined}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 70 }),
                            menu: (base) => ({ ...base, zIndex: 70 }),
                          }}
                        />
                        <ErrorMessage name="published" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* Footer (fixed) */}
              <div className="shrink-0 border-t px-6 py-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="new-blog-form"
                  disabled={loading}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? <ComponentLoader height="h-5" message="Creating..." /> : 'Create Blog'}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}