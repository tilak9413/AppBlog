import { Suspense, lazy } from 'react';
import ComponentLoader from '@/components/ComponentLoader';

// Lazy load components
const BlogCard = lazy(() => import('@/components/BlogCard'));
const HeroSection = lazy(() => import('@/components/HeroSection/HeroSection'));
const blogs = [
  {
    id: 1,
    title: "Agriculture Accounting: How Can Farmers Manage Finances Better?",
    category: "Industry Insights",
    date: "Oct 15, 2025",
    readingTime: "5 min read",
    imageUrl: "/blog1.png",
    link: "/blog/agriculture-accounting-guide",
  },
  {
    id: 2,
    title: "What Is Financial Reconciliation? A Complete Guide For CPA Firms",
    category: "CPA Strategy",
    date: "Sep 28, 2025",
    readingTime: "8 min read",
    imageUrl: "/blog2.png",
    link: "/blog/financial-reconciliation-guide",
  },
  {
    id: 3,
    title: "How Much Does A Bookkeeper Cost? Pricing Breakdown 2025",
    category: "Cost & Pricing",
    date: "Aug 10, 2025",
    readingTime: "4 min read",
    imageUrl: "/blog3.png",
    link: "/blog/bookkeeper-cost-breakdown",
  },
  {
    id: 4,
    title: "Top 5 Technologies Revolutionizing Modern Accounting Practice",
    category: "Technology",
    date: "Jul 20, 2025",
    readingTime: "7 min read",
    imageUrl: "/blog4.png", // Assuming you have more images
    link: "/blog/top-5-accounting-tech",
  },
  {
    id: 5,
    title: "Understanding GAAP vs. IFRS: Which Standard Applies to You?",
    category: "Global Standards",
    date: "Jun 5, 2025",
    readingTime: "6 min read",
    imageUrl: "/blog5.png",
    link: "/blog/gaap-vs-ifrs",
  },
  {
    id: 6,
    title: "The Essential Guide to Payroll Processing for Small Businesses",
    category: "Business Tips",
    date: "May 1, 2025",
    readingTime: "10 min read",
    imageUrl: "/blog6.png",
    link: "/blog/payroll-processing-guide",
  },
];
function page() {
  return (
<main className="bg-gray-50 min-h-screen">
      <Suspense fallback={<ComponentLoader height="h-64" message="Loading hero section..." />}>
        <div className="font-lexend">
          <HeroSection 
            title={"Explore Insightful Accounting Ideas"} 
            disc={"Dive into a world of knowledge with our curated accounting blogs. From tips and tricks to in-depth guides, discover your firm's way to accounting success by reading fresh perspectives & making informed decisions."}
          />
        </div>
      </Suspense>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Improved Grid Layout for Responsiveness and Visual Appeal */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {blogs.map((blog) => (
            <Suspense key={blog.id} fallback={<ComponentLoader height="h-64" message="Loading blog card..." />}>
              <BlogCard
                id={blog.id}
                title={blog.title}
                imageUrl={blog.imageUrl}
                link={blog.link}
                category={blog.category}
                date={blog.date}
                readingTime={blog.readingTime}
              />
            </Suspense>
          ))}
        </div>
        
        {/* Simple Pagination/Load More Placeholder */}
        <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition duration-300 shadow-sm">
                Load More Articles
            </button>
        </div>

      </section>
    </main>
  )
}

export default page
