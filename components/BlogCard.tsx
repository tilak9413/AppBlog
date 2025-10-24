'use client';
// components/BlogCard.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  category?: string;
  date?: string;
  readingTime?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, imageUrl, link, category, date, readingTime }) => {
  const [imageError, setImageError] = useState(false);
  
  // Fallback image URL - using a reliable accounting/finance themed image
  const fallbackImage = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <Link
      href={`/blog/${id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="w-full h-48 sm:h-40 md:h-52 lg:h-48 relative overflow-hidden">
        <Image
          src={imageError ? fallbackImage : imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          onError={() => setImageError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        {category && (
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-3">
            {category}
          </div>
        )}
        <h3 className="text-gray-700 font-medium text-lg md:text-base line-clamp-2 hover:text-blue-600 transition-colors duration-200 mb-3 font-lexend">
          {title}
        </h3>
        {(date || readingTime) && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            {date && <span>{date}</span>}
            {readingTime && <span>{readingTime}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
