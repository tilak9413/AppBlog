'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '@/components/customeInput/Textfield';
import TextEditor from '@/components/TextEditor/TextEditor';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudyFormValues {
    title: string;
    content: string;
}

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    editdata?: any | null; // ✅ single object or null
}

const CaseStudySchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title is too long')
        .required('Title is required'),
    content: Yup.string().required('Content is required'),
});

export default function CaseStudyModal({
    isOpen,
    onClose,
    onSuccess,
    editdata,
}: CaseStudyModalProps) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const initialValues: CaseStudyFormValues = {
        title: editdata?.title || '',
        content: editdata?.content || '',
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative mx-3"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editdata ? '✏️ Edit Case Study' : '🧩 Create New Case Study'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Formik Form */}
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={CaseStudySchema}
                            onSubmit={async (values, { resetForm, setSubmitting }) => {
                                try {
                                    setSubmitError('');
                                    setSubmitSuccess(false);

                                    let response;

                                    if (editdata?._id) {
                                        // ✅ PATCH → Update case study
                                        response = await axios.patch('/api/caseStudy', {
                                            id: editdata._id,
                                            ...values,
                                        });
                                    } else {
                                        // ✅ POST → Create new case study
                                        response = await axios.post('/api/caseStudy', values);
                                    }

                                    if (response.status === 200 || response.status === 201) {
                                        setSubmitSuccess(true);
                                        resetForm(); // ✅ clears input fields
                                        if (onSuccess) onSuccess(); // ✅ parent refresh or state update

                                        setTimeout(() => {
                                            setSubmitSuccess(false);
                                            onClose(); // ✅ closes modal
                                        }, 1200);
                                    }
                                } catch (error: any) {
                                    console.error('Error submitting case study:', error);
                                    setSubmitError(
                                        error?.response?.data?.message ||
                                        'Something went wrong. Please try again.'
                                    );
                                } finally {
                                    resetForm();
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                setFieldValue,
                                isSubmitting,
                                resetForm
                            }) => (
                                <Form className="space-y-5">
                                    {/* Title Field */}
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block text-gray-700 font-semibold mb-1"
                                        >
                                            Title
                                        </label>
                                        <Textfield
                                            name="title"
                                            placeholder="Enter case study title..."
                                            value={values.title}
                                            onChange={handleChange}
                                            className={`w-full rounded-lg border ${errors.title && touched.title
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                } p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all`}
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="p"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Content Field */}
                                    <div>
                                        <label
                                            htmlFor="content"
                                            className="block text-gray-700 font-semibold mb-1"
                                        >
                                            Content
                                        </label>
                                        <div
                                            className={`border ${errors.content && touched.content
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                                } rounded-lg overflow-hidden`}
                                        >
                                            <TextEditor
                                                label="content"
                                                initialContent={values.content}
                                                onContentChange={(value: string) =>
                                                    setFieldValue('content', value)
                                                }
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="content"
                                            component="p"
                                            className="text-red-500 text-sm mt-2"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => { onClose(); resetForm() }}
                                            className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting
                                                ? editdata
                                                    ? 'Updating...'
                                                    : 'Publishing...'
                                                : editdata
                                                    ? 'Update'
                                                    : 'Publish'}
                                        </button>
                                    </div>

                                    {/* Success Message */}
                                    {submitSuccess && (
                                        <div className="text-center text-green-600 font-medium mt-3">
                                            🎉 {editdata ? 'Case study updated' : 'Case study published'} successfully!
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {submitError && (
                                        <div className="text-center text-red-600 font-medium mt-3">
                                            ⚠️ {submitError}
                                        </div>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
