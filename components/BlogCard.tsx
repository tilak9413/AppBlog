
// components/BlogCard.tsx
import React from "react";

interface BlogCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, imageUrl, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-48 sm:h-40 md:h-52 lg:h-48 relative">
        <img
          src='https://cdn.prod.website-files.com/675151fb2f862bb258ce1ae4/68f0a15e27ac1839fdd2e1bd_Agriculture%20Accounting%20How%20Can%20Farmers%20Manage%20Finances%20Better.png'
          alt={title}
          className="w-full h-full  object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-700 font-medium text-lg md:text-base">
          {title}
        </h3>
      </div>
    </a>
  );
};

export default BlogCard;
