'use client';

import React, { Suspense, lazy, useState, useEffect } from 'react';
import Image from 'next/image';
import ComponentLoader from '@/components/ComponentLoader';

// Lazy import if you already have a separate HeroSection component
// const HeroSection = lazy(() => import('@/components/HeroSection/HeroSection'));

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Value {
  title: string;
  description: string;
}

interface AboutData {
  title: string;
  description: string;
  mission: string;
  vision: string;
  team: TeamMember[];
  companyHistory: string;
  values: Value[];
}

// Fetch About data from API
async function getAboutData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/about`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch about data');

    return res.json();
  } catch (error) {
    console.error('Error loading about data:', error);
    return null;
  }
}

// --- Small Benefit Card component ---
const BenefitCard: React.FC<{
  iconSymbol: string;
  title: string;
  description: string;
  subText?: string;
}> = ({ iconSymbol, title, description, subText }) => (
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

// --- HeroSection component ---
const HeroSection: React.FC<{ title: string; disc: string; showButton?: boolean }> = ({
  title,
  disc,
  showButton = true,
}) => (
  <Suspense fallback={<ComponentLoader height="h-screen" message="Loading hero section..." />}>
    <section className="bg-white relative overflow-hidden">
      {/* SECTION 1: Hero Content */}
      <div className="relative pt-24 pb-20 md:pt-32 md:pb-28 min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gray-100 to-white"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">{disc}</p>
          {showButton && (
            <button className="px-8 py-3 bg-slate-700 text-white font-medium rounded-lg shadow-lg hover:bg-slate-800 transition duration-300 transform hover:scale-[1.05]">
              Get Started
            </button>
          )}
        </div>
      </div>

      {/* SECTION 2: Why Choose Us */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Why Choose StanTax?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the StanTax difference — expertise combined with rapid scaling for your CPA firm.
          </p>
        </div>

        {/* Grid of Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard
            iconSymbol="⏱️"
            title="Faster Turnaround Time"
            description="Deliver timely results with outsourced services. StanTax ensures smooth month-end closings."
            subText="Quality Check"
          />
          <BenefitCard
            iconSymbol="🌟"
            title="10+ Years of Experience"
            description="Over a decade of supporting CPA firms with financial and accounting expertise."
            subText="Industry Experience"
          />
          <BenefitCard
            iconSymbol="💰"
            title="Cost-Efficient Services"
            description="Optimize your budget without compromising on quality — high ROI guaranteed."
            subText="High ROI"
          />
        </div>
      </div>
    </section>
  </Suspense>
);

// --- Main About Page ---
const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultAboutData: AboutData = {
    title: 'About StanTax',
    description: 'We’re a team of accounting professionals helping businesses succeed.',
    mission: 'Provide exceptional accounting services that empower smart financial decisions.',
    vision: 'To be the most trusted accounting partner for all businesses.',
    companyHistory:
      'Founded in 2010, StanTax has grown from a small team to a leading accounting firm serving clients nationwide.',
    team: [
      { name: 'John Smith', position: 'CEO', bio: '20+ years of experience in accounting and finance.', image: '/team1.jpg' },
      { name: 'Sarah Johnson', position: 'CFO', bio: 'Specializes in tax planning and strategy.', image: '/team2.jpg' },
    ],
    values: [
      { title: 'Integrity', description: 'We uphold the highest ethical standards in all work.' },
      { title: 'Excellence', description: 'We strive for excellence in every service we provide.' },
      { title: 'Client Focus', description: 'Our clients’ success is our top priority.' },
    ],
  };

  useEffect(() => {
    async function loadAbout() {
      const data = await getAboutData();
      setAboutData(data || defaultAboutData);
      setLoading(false);
    }
    loadAbout();
  }, []);

  if (loading) return <ComponentLoader height="h-64" message="Loading about page..." />;

  return (
    <div>
      <HeroSection title={aboutData?.title || 'About StanTax'} disc={aboutData?.description || ''} />

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p>{aboutData?.mission}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p>{aboutData?.vision}</p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our History</h2>
  <div
    className="prose max-w-none text-gray-700"
    dangerouslySetInnerHTML={{ __html: aboutData?.companyHistory || '' }}
  />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData?.team.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-600">{member.position}</p>
                <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {aboutData?.values.map((val, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-gray-600">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
