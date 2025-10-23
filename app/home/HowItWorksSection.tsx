"use client";

import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";

const steps = [
  {
    image: "/images/step1-discussion.svg",
    title: "1. Preliminary Discussion",
    description:
      "We kickstart our working relationship by discussing your business requirements & what you hope to achieve with our help.",
  },
  {
    image: "/images/step2-slas.svg",
    title: "2. SLAs Setup",
    description:
      "After discussing your requirements, our team understands your operating procedures, helping us set the right SLAs.",
  },
  {
    image: "/images/step3-contract.svg",
    title: "3. Contract Agreement",
    description:
      "Once the SLAs are set up, we officiate this by signing an agreement outlining—team members, deadlines, clauses, etc.",
  },
  {
    image: "/images/step4-onboarding.svg",
    title: "4. Team Onboarding",
    description:
      "Your dedicated accounting professional(s) are onboarded, trained on your systems, and ready to commence work.",
  },
  {
    image: "/images/step5-delivery.svg",
    title: "5. Service Delivery",
    description:
      "We commence seamless service delivery, offering continuous support and regular reports to ensure your satisfaction.",
  },
];

const AUTO_SLIDE_INTERVAL = 4000;

const HowItWorksSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  const totalSlides = steps.length;

  // Determine visible items dynamically based on screen width
  const getVisibleItems = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3; // desktop
    if (window.innerWidth >= 768) return 2; // tablet
    return 1; // mobile
  };

  useEffect(() => {
    const handleResize = () => setVisibleItems(getVisibleItems());
    setVisibleItems(getVisibleItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(totalSlides / visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const trackShiftPercentage = currentSlide * (100 / totalPages);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Hire Top Accounting Professionals In 5 Easy Steps
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto md:mx-0">
          Our streamlined 5-step process makes it simple for CPAs and
          businesses to hire top accounting talent effortlessly.
        </p>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${trackShiftPercentage}%)` }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-3"
                style={{ width: `calc(100% / ${visibleItems})` }}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col items-center md:items-start text-center md:text-left h-full">
                  <div className="relative h-40 w-full mb-6 flex items-center justify-center bg-gray-100 rounded-md">
                    {/* Image */}
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
