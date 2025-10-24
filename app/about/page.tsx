'use client';

import React, { Suspense, lazy } from 'react';
import Image from 'next/image';
import ComponentLoader from '@/components/ComponentLoader';

interface HeroSectionProps {
  // These props are primarily for the *top* part of the hero
  title?: string; 
  disc?: string;
  showButton?: boolean; 
}

// --- Reusable Placeholder Components for the floating elements in the top Hero ---

// Small Profile Card (Pinal Mehta / Shiv Panchal)
const ProfileCard: React.FC<{ name: string; role: string; imageUrl: string; position: string }> = ({ name, role, imageUrl, position }) => (
    <div className={`absolute w-40 p-3 bg-white rounded-lg shadow-xl flex items-center space-x-2 border border-gray-200 ${position} transform -translate-x-1/2 -translate-y-1/2`}>
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            {/* Placeholder for Profile Image */}
            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600">
                {name.charAt(0)}
            </div>
             {/* If you have actual images, use Next.js Image component */}
             {/* <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" /> */}
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
        </div>
    </div>
);

// Small Metric Card (Performance / Graph)
const MetricCard: React.FC<{ title: string; symbol: string; position: string }> = ({ title, symbol, position }) => (
    <div className={`absolute w-32 p-3 bg-white rounded-xl shadow-xl border border-gray-200 text-center ${position} transform -translate-x-1/2 -translate-y-1/2`}>
        <div className="text-3xl text-green-500 mb-1">{symbol}</div>
        <p className="text-xs font-semibold text-gray-700">{title}</p>
    </div>
);

// --- Benefit Card (from WhyChooseUsSection) ---
interface BenefitCardProps {
    iconSymbol: string;
    title: string;
    description: string;
    subText?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ iconSymbol, title, description, subText }) => (
    <div className="relative flex flex-col p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1 duration-300 h-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-60"></div>
        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                {subText && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {subText}
                    </span>
                )}
                <div className="w-10 h-10 flex items-center justify-center text-xl text-green-600 border border-green-300 rounded-lg bg-green-50">
                    {iconSymbol}
                </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 flex-grow leading-relaxed">{description}</p>
        </div>
    </div>
);

// --- The Main Combined HeroSection Component ---
const HeroSection: React.FC<HeroSectionProps> = ({ 
    title = "Work With The Top Accounting Talent; Fast, Skilled, And Specialized", 
    disc = "Partner with StanTax to elevate your practice. From precision in data to streamlined processes, we handle the heavy lifting, allowing you to focus on what matters most—your clients. Discover the StanTax difference today.", 
    showButton = true // Default to true if used as a primary hero
}) => {
  
  // Custom Styles for the positions (Based on visual estimation of the image)
  const positions = {
    pinal: "top-[15%] left-[20%]",      
    shiv: "bottom-[15%] right-[20%]",    
    performance: "top-[20%] right-[25%]", 
    graph: "bottom-[20%] left-[25%]",     
    smallNote: "bottom-[5%] left-[28%]"  // Adjusted for responsiveness
  };

  return (
    <Suspense fallback={<ComponentLoader height="h-screen" message="Loading about page..." />}>
      <section className="bg-white relative overflow-hidden">
      
      {/* SECTION 1: Top Graphical Hero */}
      <div className="relative pt-24 pb-20 md:pt-32 md:pb-28 min-h-[600px] flex items-center justify-center">
        {/* Subtle Background (Curved/Faded look from the image) */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gray-100 to-white"></div>

        {/* Dashed Line Background (The connecting flow lines) */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 700" preserveAspectRatio="none">
            {/* Main vertical line (center) */}
            <path d="M500,0 L500,700" stroke="#374151" strokeDasharray="5, 10" fill="none" />
            
            {/* Curved paths from corners to center */}
            <path d="M250,50 C400,100 450,200 500,350" stroke="#374151" strokeDasharray="5, 10" fill="none" />
            <path d="M750,650 C600,600 550,500 500,350" stroke="#374151" strokeDasharray="5, 10" fill="none" />
            <path d="M750,50 C600,100 550,200 500,350" stroke="#374151" strokeDasharray="5, 10" fill="none" />
            <path d="M250,650 C400,600 450,500 500,350" stroke="#374151" strokeDasharray="5, 10" fill="none" />
        </svg>
        
        {/* Main Content (Centered) */}
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
            {disc}
          </p>
          
          {showButton && (
            <button className="px-8 py-3 bg-slate-700 text-white font-medium rounded-lg shadow-lg hover:bg-slate-800 transition duration-300 transform hover:scale-[1.05]">
              Get Started
            </button>
          )}
        </div>
      </div> {/* End of Top Graphical Hero */}

      {/* SECTION 2: Why Choose Us (from your provided code) */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose StanTax?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the StanTax difference. Choose the perfect combo of expertise combined with rapid scaling for your CPA firm.
          </p>
        </div>

        {/* Grid of Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col space-y-6">
            <BenefitCard
              iconSymbol="⏱️"
              title="Faster Turn Around Time"
              description="Delivering timely results with outsourced services. StanTax ensures your clients' accounting needs are met quickly, supporting a smooth month-end close."
              subText="Quality Check"
            />
            {/* Dedicated Accountants Card */}
            <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center space-x-3 hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                👨‍💼
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">45+ Dedicated Accountants</h4>
                <p className="text-sm text-gray-600">
                  Our team offers dedicated, reliable support & expertise tailored to your needs.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-6">
            <BenefitCard
              iconSymbol="🌟"
              title="10+ Years of Experience"
              description="With over a decade supporting CPA firms, we possess the deep knowledge and expertise to support your specialized financial needs."
              subText="Industry Experience"
            />
            {/* Tools Proficiency Card */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Proficient in Accounting Tools</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our team is skilled across all major accounting platforms.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-xl font-bold text-green-700">XERO</div>
                <div className="text-xl font-bold text-blue-700">QB</div>
                <div className="text-xl font-bold text-red-700">S</div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-6">
            <BenefitCard
              iconSymbol="🛠️"
              title="Flexible Working Models"
              description="We adapt to your specific workflow and requirements. Our models provide you the flexibility needed to scale your firm's needs effortlessly."
              subText="Customizable"
            />
            <BenefitCard
              iconSymbol="💰"
              title="Cost-Efficient Services"
              description="Optimize your budget without compromising quality. We lower your fixed costs, offering a cost-effective solution without cutting corners."
              subText="High ROI"
            />
          </div>
        </div>
        </div> {/* End of Why Choose Us Section */}

      </section>
    </Suspense>
  );
};

export default HeroSection;