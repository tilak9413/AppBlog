// components/ServiceCard.tsx
import Link from "next/link";
import Image from "next/image"; // Import Image component

interface ServiceCardProps {
  post: {
    id: number;
    title: string;
    img: string; // Added image URL
    excerpt: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ post }) => {
  return (
    <Link
      href={`/services/${post.id}`} // Updated link for services
      className="flex flex-col p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="flex items-center justify-start space-x-4 mb-4">
        {/* Icon placeholder/Image */}
        <div className="p-2 bg-gray-100 rounded-lg">
          <Image
            src={post.img} // Use the image prop from the blog data
            alt={`${post.title} icon`}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        {/* Title and Arrow */}
        <div className="flex-grow flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
            {post.title} →
          </h2>
        </div>
      </div>

      {/* Excerpt */}
      <p className="text-gray-600 text-base leading-relaxed mt-2 flex-grow">
        {post.excerpt}
      </p>

      {/* The arrow is integrated into the title now, but we can add an extra flex if needed.
          For a direct match to the image design, let's keep it simple for now and rely on the "→" in the title.
      */}
    </Link>
  );
};

export default ServiceCard;