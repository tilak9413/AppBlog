// components/BlogSection.tsx
import BlogCard from "@/components/BlogCard";
import React from "react";

const blogs = [
  {
    title: "Agriculture Accounting: How Can Farmers Manage Finances Better?",
    imageUrl: "/blog1.png", // Replace with your image path
    link: "#",
  },
  {
    title: "What Is Financial Reconciliation? A Complete Guide For CPA Firms",
    imageUrl: "/blog2.png",
    link: "#",
  },
  {
    title: "How Much Does A Bookkeeper Cost?",
    imageUrl: "/blog3.png",
    link: "#",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Our Latest Accounting and Bookkeeping Blogs
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            imageUrl={blog.imageUrl}
            link={blog.link}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
