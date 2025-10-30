'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import ComponentLoader from '@/components/ComponentLoader';

// Lazy load components
const BlogCard = lazy(() => import('@/components/BlogCard'));
const HeroSection = lazy(() => import('@/components/HeroSection/HeroSection'));

const Page = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');

        const data = await response.json();
        console.log('Fetched blogs data:', data);

        // Check if API returned an array or an object
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          setBlogs([]);
        }

      } catch (err) {
        console.error('Fetch error:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ComponentLoader height="h-64" message="Loading content..." />
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Suspense fallback={<ComponentLoader height="h-64" message="Loading hero section..." />}>
        <div className="font-lexend">
          <HeroSection
            title={heroData?.title || 'Explore Insightful Accounting Ideas'}
            disc={
              heroData?.disc ||
              'Dive into a world of knowledge with our curated accounting blogs. From tips and tricks to in-depth guides, discover your firm’s way to accounting success by reading fresh perspectives & making informed decisions.'
            }
            image={heroData?.image}
          />
        </div>
      </Suspense>

      {/* Blog Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                imageUrl={blog.image}
                link={`/blog/${blog.slug}`}
                category={blog.category || 'General'}
                date={new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
                readingTime={blog.readTime || '5 min read'}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No blogs found</p>
          )}


        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition duration-300 shadow-sm">
            Load More Articles
          </button>
        </div>
      </section>
    </main>
  );
};

export default Page;
