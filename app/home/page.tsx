"use client";
import { Suspense, lazy } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ComponentLoader from "@/components/ComponentLoader";

// Lazy load components
const HeroSection = lazy(() => import("@/components/HeroSection/HeroSection"));
const BlogServiceCard = lazy(() => import("@/components/BlogServiceCard"));
const Trusted = lazy(() => import("./Trusted"));
const Team = lazy(() => import("./Team"));
const WhyChooseUsSection = lazy(() => import("./WhyChooseUsSection"));
const HowItWorksSection = lazy(() => import("./HowItWorksSection"));
const IndustriesSection = lazy(() => import("./IndustriesSection"));
const BlogSection = lazy(() => import("./BlogSection"));
const JoinTeamSection = lazy(() => import("./JoinTeamSection"));
const CaseStudiesAndConnect = lazy(() => import("./CaseStudiesAndConnect"));

const fadeIn = (delay = 0, y = 40) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true },
});


const blogs = [
    {
        id: 1,
        title: "Getting Started with Next.js 14",
        img: "https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732eedcfeeebafefe65ebd0_icons8-checklist-94%201.svg",
        excerpt: "Learn how to set up and structure your first Next.js app...",
        date: "2025-10-22",
    },
    {
        id: 2,
        title: "Why Tailwind CSS is Perfect for Blogs",
        img: "https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732eedee4354c083390f315_icons8-resume-94%201.svg",
        excerpt: "A deep dive into Tailwind for fast UI development...",
        date: "2025-10-20",
    },
    {
        id: 3,
        title: "Why Tailwind CSS is Perfect for Blogs",
        img: "https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732eedd1ecc3b35a9896b53_icons8-talk-94%201.svg",
        excerpt: "A deep dive into Tailwind for fast UI development...",
        date: "2025-10-20",
    },
    {
        id: 4,
        title: "Why Tailwind CSS is Perfect for Blogs",
        img: "https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732eedcdff39f1fc7a90b67_icons8-accounting-94%201.svg",
        excerpt: "A deep dive into Tailwind for fast UI development...",
        date: "2025-10-20",
    },
    {
        id: 5,
        title: "Why Tailwind CSS is Perfect for Blogs",
        img: "https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732eedd58a2203357e2c49d_icons8-investment-94%201.svg",
        excerpt: "A deep dive into Tailwind for fast UI development...",
        date: "2025-10-20",
    },
    {
        id: 6,
        title: "Why Tailwind CSS is Perfect for Blogs",
        img: "https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6732eedc8d7996c335092337_icons8-bill-94%201.svg",
        excerpt: "A deep dive into Tailwind for fast UI development...",
        date: "2025-10-20",
    },
];

const companies = [
    { name: "Google", type: "image", logo: "/logos/google.png" },
    {
        name: "AWS",
        type: "svg",
        logo: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 154" className="w-24 h-10">
                <path
                    fill="#FF9900"
                    d="M52.8 125.5c-18.9 14.1-37.2 22.4-56.4 26.2C-7.7 152.9 0 146 4.6 137.6 12 125 22.6 109.7 31.5 99c11-12.8 21.6-20.8 32.4-25.6 9.8-4.3 17.2-5.2 25.1-2.9 9.4 2.9 15.7 9.9 18.8 19.8 3.3 10.6 2.4 22.3-3 33.6-6.2 12.5-17.2 23.2-33.2 34.3l-18.8 12.8z"
                />
            </svg>
        ),
    },
    { name: "Microsoft", type: "image", logo: "/logos/microsoft.png" },
    {
        name: "Vercel",
        type: "svg",
        logo: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000" className="w-24 h-10">
                <path fill="currentColor" d="M577.5 0L1155 1000H0z" />
            </svg>
        ),
    },
    { name: "Spotify", type: "image", logo: "/logos/spotify.png" },
    {
        name: "TailwindCSS",
        type: "svg",
        logo: (
            <svg viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" className="w-24 h-10">
                <path
                    fill="#38bdf8"
                    d="M24 0C17.6 0 13.6 3.2 12 9.6c2.4-3.2 5.2-4.4 8.4-3.6 1.8.4 3 1.6 4.4 3.2 2.4 2.8 5.2 5.6 10.8 5.6 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.4-3-1.6-4.4-3.2C32.4 2.8 29.6 0 24 0zm-12 14.4c-6.4 0-10.4 3.2-12 9.6 2.4-3.2 5.2-4.4 8.4-3.6 1.8.4 3 1.6 4.4 3.2 2.4 2.8 5.2 5.6 10.8 5.6 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.4-3-1.6-4.4-3.2-2.4-2.8-5.2-5.6-10.8-5.6z"
                />
            </svg>
        ),
    },
];

export default function Home() {
    return (
        <>
            <Suspense fallback={<ComponentLoader height="h-96" message="Loading hero section..." />}>
                <HeroSection title={"  Discover Insights, Tips & Stories from Modern Developers"} disc={" Welcome to our Dev Blog — your go-to space for tutorials, best practices, and deep dives into web development, DevOps, and the latest technologies."}  />
            </Suspense>

            {/* Trusted Companies Section */}
            <motion.section
                {...fadeIn(0.2, 50)}
                className="relative w-full py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden flex flex-col items-center"
            >
                <motion.h1
                    {...fadeIn(0.1, 20)}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center"
                >
                    Trusted by Global Companies
                </motion.h1>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden">
                    {/* Moving Track */}
                    <motion.div
                        className="flex gap-10"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 15,
                            ease: "linear",
                        }}
                    >
                        {/* Repeat logos twice for continuous loop */}
                        {[...companies, ...companies].map((company, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center w-32 h-16 opacity-80 hover:opacity-100 transition"
                            >
                                {company.type === "image" ? (
                                    <Image
                                        src={company.logo as string}
                                        alt={company.name}
                                        width={120}
                                        height={60}
                                        className="object-contain grayscale hover:grayscale-0 transition duration-300"
                                    />
                                ) : (
                                    <div className="text-gray-700 hover:text-blue-500 transition">
                                        {company.logo}
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent"></div>
            </motion.section>

            {/* Team Section */}
            <motion.div {...fadeIn(0.2)} className="w-full px-6 md:px-16">
                <Suspense fallback={<ComponentLoader height="h-64" message="Loading team section..." />}>
                    <Team />
                </Suspense>
            </motion.div>

            {/* Trusted Section */}
            <motion.div {...fadeIn(0.2)} className="w-full">
                <Suspense fallback={<ComponentLoader height="h-64" message="Loading trusted section..." />}>
                    <Trusted />
                </Suspense>
            </motion.div>

            {/* Blog Section */}
            <main className="w-full px-6 md:px-16">
                <motion.div {...fadeIn(0.2)} className="flex flex-col py-16 bg-gradient-to-b px-4 md:px-16">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <motion.h1
                            {...fadeIn(0.1, 30)}
                            className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4"
                        >
                            Your Partner In Professional Accounting Services In Miami
                        </motion.h1>
                        <motion.p
                            {...fadeIn(0.2, 20)}
                            className="text-gray-600 text-lg md:text-xl leading-relaxed"
                        >
                            From bookkeeping to auditing, our dynamism lies in the competitive edge we offer.
                            Outsource to us, and let our offshore team outshine it.
                        </motion.p>
                    </div>

                    {/* Blog Cards */}
                    <motion.div
                        {...fadeIn(0.3, 20)}
                        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {blogs.map((post, i) => (
                            <motion.div
                                key={post.id}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Suspense fallback={<ComponentLoader height="h-64" message="Loading blog card..." />}>
                                    <BlogServiceCard post={post} />
                                </Suspense>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Additional Sections with motion */}
                <motion.div {...fadeIn(0.2)}>
                    <Suspense fallback={<ComponentLoader height="h-64" message="Loading why choose us section..." />}>
                        <WhyChooseUsSection />
                    </Suspense>
                </motion.div>
                <motion.div {...fadeIn(0.2)}>
                    <Suspense fallback={<ComponentLoader height="h-64" message="Loading how it works section..." />}>
                        <HowItWorksSection />
                    </Suspense>
                </motion.div>
                <motion.div {...fadeIn(0.2)}>
                    <Suspense fallback={<ComponentLoader height="h-64" message="Loading industries section..." />}>
                        <IndustriesSection />
                    </Suspense>
                </motion.div>
                <motion.div {...fadeIn(0.2)}>
                    <Suspense fallback={<ComponentLoader height="h-64" message="Loading join team section..." />}>
                        <JoinTeamSection />
                    </Suspense>
                </motion.div>
                <motion.div {...fadeIn(0.2)}>
                    <Suspense fallback={<ComponentLoader height="h-64" message="Loading blog section..." />}>
                        <BlogSection />
                    </Suspense>
                </motion.div>
                <motion.div {...fadeIn(0.2)}>
                    <Suspense fallback={<ComponentLoader height="h-64" message="Loading case studies section..." />}>
                        <CaseStudiesAndConnect />
                    </Suspense>
                </motion.div>
            </main>
        </>
    );
}
