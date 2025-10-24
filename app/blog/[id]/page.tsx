'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ComponentLoader from '@/components/ComponentLoader';
import Image from 'next/image';

// Lazy load components
const BlogCard = lazy(() => import('@/components/BlogCard'));

const fadeIn = (delay = 0, y = 40) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

// Blog data with full content
const blogData = {
  1: {
    id: 1,
    title: "Agriculture Accounting: How Can Farmers Manage Finances Better?",
    category: "Industry Insights",
    date: "Oct 15, 2025",
    readingTime: "5 min read",
    imageUrl: "/blog1.png",
    author: "Dr. Sarah Johnson",
    authorRole: "Agricultural Finance Specialist",
    excerpt: "Learn how modern accounting practices can revolutionize farm financial management and boost profitability.",
    content: `
      <h2>Introduction to Agricultural Accounting</h2>
      <p>Agricultural accounting is a specialized branch of accounting that focuses on the unique financial needs of farming operations. Unlike traditional businesses, farms face seasonal variations, weather dependencies, and commodity price fluctuations that require specialized accounting approaches.</p>
      
      <h3>Key Challenges in Farm Financial Management</h3>
      <p>Farmers often struggle with:</p>
      <ul>
        <li>Seasonal cash flow management</li>
        <li>Inventory valuation of crops and livestock</li>
        <li>Tax planning for agricultural income</li>
        <li>Risk management and insurance planning</li>
      </ul>
      
      <h3>Modern Solutions for Farm Accounting</h3>
      <p>Today's farmers have access to advanced accounting software and financial management tools that can help:</p>
      <ul>
        <li>Track crop yields and profitability by field</li>
        <li>Monitor livestock production costs</li>
        <li>Plan for equipment purchases and maintenance</li>
        <li>Optimize tax strategies</li>
      </ul>
      
      <h3>Best Practices for Farm Financial Management</h3>
      <p>Successful farm financial management requires:</p>
      <ol>
        <li>Regular financial record keeping</li>
        <li>Monthly profit and loss statements</li>
        <li>Annual balance sheet preparation</li>
        <li>Cash flow projections</li>
        <li>Regular consultation with agricultural accountants</li>
      </ol>
      
      <h3>Conclusion</h3>
      <p>Proper accounting practices are essential for farm success. By implementing modern accounting methods, farmers can make better financial decisions, improve profitability, and ensure long-term sustainability of their operations.</p>
    `,
    tags: ["Agriculture", "Accounting", "Farm Management", "Financial Planning"],
    relatedArticles: [2, 3, 4]
  },
  2: {
    id: 2,
    title: "What Is Financial Reconciliation? A Complete Guide For CPA Firms",
    category: "CPA Strategy",
    date: "Sep 28, 2025",
    readingTime: "8 min read",
    imageUrl: "/blog2.png",
    author: "Michael Chen",
    authorRole: "CPA & Financial Consultant",
    excerpt: "A comprehensive guide to financial reconciliation processes that every CPA firm should master.",
    content: `
      <h2>Understanding Financial Reconciliation</h2>
      <p>Financial reconciliation is the process of comparing two sets of records to ensure they match and are consistent. This critical accounting process helps identify discrepancies and ensures financial accuracy.</p>
      
      <h3>Types of Financial Reconciliation</h3>
      <p>There are several types of reconciliation that CPA firms commonly handle:</p>
      <ul>
        <li>Bank reconciliation</li>
        <li>Account reconciliation</li>
        <li>Intercompany reconciliation</li>
        <li>Credit card reconciliation</li>
      </ul>
      
      <h3>Best Practices for Reconciliation</h3>
      <p>Effective reconciliation requires:</p>
      <ol>
        <li>Regular scheduling of reconciliation activities</li>
        <li>Use of automated reconciliation tools</li>
        <li>Proper documentation of all adjustments</li>
        <li>Regular review and approval processes</li>
      </ol>
      
      <h3>Common Challenges and Solutions</h3>
      <p>CPA firms often face challenges in reconciliation including timing differences, missing transactions, and data entry errors. Modern accounting software can help automate many of these processes.</p>
    `,
    tags: ["CPA", "Reconciliation", "Financial Management", "Accounting"],
    relatedArticles: [1, 3, 5]
  },
  3: {
    id: 3,
    title: "How Much Does A Bookkeeper Cost? Pricing Breakdown 2025",
    category: "Cost & Pricing",
    date: "Aug 10, 2025",
    readingTime: "4 min read",
    imageUrl: "/blog3.png",
    author: "Jennifer Martinez",
    authorRole: "Small Business Finance Expert",
    excerpt: "Complete breakdown of bookkeeping costs to help businesses budget for professional accounting services.",
    content: `
      <h2>Bookkeeping Cost Factors</h2>
      <p>The cost of bookkeeping services varies based on several factors including business size, transaction volume, and service complexity.</p>
      
      <h3>Pricing Models</h3>
      <p>Bookkeepers typically charge using one of these models:</p>
      <ul>
        <li>Hourly rates ($25-$150 per hour)</li>
        <li>Monthly retainer fees ($200-$2,000)</li>
        <li>Per-transaction pricing</li>
        <li>Percentage of revenue</li>
      </ul>
      
      <h3>Factors Affecting Cost</h3>
      <p>Several factors influence bookkeeping costs:</p>
      <ul>
        <li>Number of transactions per month</li>
        <li>Complexity of business operations</li>
        <li>Required reporting frequency</li>
        <li>Industry-specific requirements</li>
      </ul>
      
      <h3>Cost-Benefit Analysis</h3>
      <p>While bookkeeping services represent a cost, they often provide significant value through improved financial management, tax savings, and business insights.</p>
    `,
    tags: ["Bookkeeping", "Pricing", "Small Business", "Cost Analysis"],
    relatedArticles: [1, 2, 6]
  },
  4: {
    id: 4,
    title: "Top 5 Technologies Revolutionizing Modern Accounting Practice",
    category: "Technology",
    date: "Jul 20, 2025",
    readingTime: "7 min read",
    imageUrl: "/blog4.png",
    author: "David Kim",
    authorRole: "Technology Integration Specialist",
    excerpt: "Explore the cutting-edge technologies that are transforming the accounting profession.",
    content: `
      <h2>Technology Revolution in Accounting</h2>
      <p>The accounting profession is undergoing a digital transformation, with new technologies revolutionizing how accountants work and serve their clients.</p>
      
      <h3>1. Cloud Accounting Software</h3>
      <p>Cloud-based accounting platforms like QuickBooks Online, Xero, and FreshBooks have made financial management more accessible and collaborative.</p>
      
      <h3>2. Artificial Intelligence and Machine Learning</h3>
      <p>AI is automating routine tasks like data entry, categorization, and anomaly detection, allowing accountants to focus on strategic advisory services.</p>
      
      <h3>3. Blockchain Technology</h3>
      <p>Blockchain is providing new ways to verify transactions and maintain immutable financial records.</p>
      
      <h3>4. Robotic Process Automation (RPA)</h3>
      <p>RPA is streamlining repetitive accounting tasks, reducing errors and improving efficiency.</p>
      
      <h3>5. Advanced Analytics and Reporting</h3>
      <p>Modern analytics tools provide deeper insights into financial data, enabling better business decisions.</p>
    `,
    tags: ["Technology", "AI", "Cloud Computing", "Automation"],
    relatedArticles: [2, 5, 6]
  },
  5: {
    id: 5,
    title: "Understanding GAAP vs. IFRS: Which Standard Applies to You?",
    category: "Global Standards",
    date: "Jun 5, 2025",
    readingTime: "6 min read",
    imageUrl: "/blog5.png",
    author: "Dr. Robert Wilson",
    authorRole: "International Accounting Standards Expert",
    excerpt: "A comprehensive comparison of GAAP and IFRS accounting standards to help businesses choose the right framework.",
    content: `
      <h2>GAAP vs. IFRS: Key Differences</h2>
      <p>Generally Accepted Accounting Principles (GAAP) and International Financial Reporting Standards (IFRS) are the two primary accounting frameworks used globally.</p>
      
      <h3>GAAP (Generally Accepted Accounting Principles)</h3>
      <p>GAAP is primarily used in the United States and focuses on detailed rules and regulations for financial reporting.</p>
      
      <h3>IFRS (International Financial Reporting Standards)</h3>
      <p>IFRS is used in over 140 countries and emphasizes principles-based accounting standards.</p>
      
      <h3>Key Differences</h3>
      <ul>
        <li>Inventory valuation methods</li>
        <li>Revenue recognition principles</li>
        <li>Lease accounting standards</li>
        <li>Financial statement presentation</li>
      </ul>
      
      <h3>Choosing the Right Standard</h3>
      <p>The choice between GAAP and IFRS depends on your business location, investor requirements, and regulatory obligations.</p>
    `,
    tags: ["GAAP", "IFRS", "Accounting Standards", "International"],
    relatedArticles: [2, 4, 6]
  },
  6: {
    id: 6,
    title: "The Essential Guide to Payroll Processing for Small Businesses",
    category: "Business Tips",
    date: "May 1, 2025",
    readingTime: "10 min read",
    imageUrl: "/blog6.png",
    author: "Lisa Thompson",
    authorRole: "Payroll and HR Specialist",
    excerpt: "Complete guide to payroll processing for small businesses, including compliance requirements and best practices.",
    content: `
      <h2>Payroll Processing Fundamentals</h2>
      <p>Payroll processing is one of the most critical functions for small businesses, involving complex calculations, tax withholdings, and compliance requirements.</p>
      
      <h3>Key Components of Payroll</h3>
      <ul>
        <li>Employee time tracking</li>
        <li>Salary and wage calculations</li>
        <li>Tax withholdings and deductions</li>
        <li>Benefits administration</li>
        <li>Payroll tax reporting</li>
      </ul>
      
      <h3>Compliance Requirements</h3>
      <p>Small businesses must comply with various federal, state, and local payroll regulations including:</p>
      <ul>
        <li>Fair Labor Standards Act (FLSA)</li>
        <li>Federal and state tax requirements</li>
        <li>Workers' compensation regulations</li>
        <li>Unemployment insurance requirements</li>
      </ul>
      
      <h3>Best Practices for Payroll Management</h3>
      <p>Effective payroll management requires:</p>
      <ol>
        <li>Accurate time tracking</li>
        <li>Regular payroll processing schedules</li>
        <li>Proper record keeping</li>
        <li>Regular compliance reviews</li>
      </ol>
    `,
    tags: ["Payroll", "Small Business", "Compliance", "HR"],
    relatedArticles: [1, 3, 5]
  }
};

export default function BlogArticle() {
  const params = useParams();
  const blogId = parseInt(params.id as string);
  const blog = blogData[blogId as keyof typeof blogData];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The blog article you're looking for doesn't exist.</p>
          <Link 
            href="/blogs" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = blog.relatedArticles.map(id => blogData[id as keyof typeof blogData]).filter(Boolean);

  return (
    <Suspense fallback={<ComponentLoader height="h-screen" message="Loading blog article..." />}>
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeIn(0.2)}
              className="text-center space-y-6 font-lexend"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                {blog.category}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {blog.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {blog.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">
                      {blog.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{blog.author}</p>
                    <p className="text-xs">{blog.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readingTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Image */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeIn(0.3)}
              className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeIn(0.4)}
              className="prose prose-lg max-w-none font-lexend"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </section>

        {/* Tags */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeIn(0.5)}
              className="flex flex-wrap gap-2"
            >
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                {...fadeIn(0.2)}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Related Articles
                </h2>
                <p className="text-lg text-gray-600">
                  Continue reading with these related articles
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog, index) => (
                  <Suspense 
                    key={relatedBlog.id} 
                    fallback={<ComponentLoader height="h-64" message="Loading related article..." />}
                  >
                    <motion.div
                      {...fadeIn(0.1 * (index + 1))}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/blog/${relatedBlog.id}`}>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="w-full h-48 relative">
                            <Image
                              src={relatedBlog.imageUrl}
                              alt={relatedBlog.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-6">
                            <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-3">
                              {relatedBlog.category}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {relatedBlog.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {relatedBlog.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{relatedBlog.date}</span>
                              <span>{relatedBlog.readingTime}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </Suspense>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blogs CTA */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              {...fadeIn(0.2)}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Explore More Articles
              </h2>
              <p className="text-lg text-gray-600">
                Discover more insights and tips from our accounting experts
              </p>
              <Link 
                href="/blogs"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Articles
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
