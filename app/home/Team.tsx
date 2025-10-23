"use client";

import AccountantCard from "@/components/AccountantCard";
import Tabs from "@/components/Tabs/Tabs";

export default function Team() {
  const roles = [
    { label: "Senior Accountants", value: "senior", component: <AccountantCard /> },
    { label: "Tax Preparers", value: "tax", component: <AccountantCard /> },
    { label: "Fractional CFO", value: "cfo", component: <AccountantCard /> },
    { label: "Bookkeepers", value: "bookkeeper", component: <AccountantCard /> },
    { label: "Payroll", value: "payroll", component: <AccountantCard /> },
  ];

  return (
    <section className="flex flex-col py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Heading */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center md:text-left leading-tight">
        The Outsourcing Team You Can Count On
      </h3>

      {/* Subtext */}
      <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0 text-center md:text-left mb-10">
        Looking for an Accountant to maintain clean-cut records or a Fractional CFO to create
        excellent financial strategy? Our elite professionals are ready to maximize productivity for you.
      </p>

      {/* Tabs Section */}
      <div className="mb-12">
        <Tabs
          tabs={roles}
          defaultActive="senior"
          onChange={(value) => console.log("Selected Tab:", value)}
        />
      </div>

      {/* Services Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 leading-snug">
            Outsource Accounting, Bookkeeping & Payroll Services
          </h3>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
            Stanfox is a trusted outsource accounting and bookkeeping company that helps businesses
            gain financial clarity and operational efficiency. With a sharp focus on accuracy, compliance,
            and timeliness, we provide tailored solutions to CPAs, accounting firms, and startups.
            From recording daily transactions to managing end-to-end payroll, we bring expertise
            and peace of mind to your finance department.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
          <img
            src="https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/67e687fc26d372e8e15937d1_CFO%20Advisory%20Service.svg"
            alt="CFO Advisory Service"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}
