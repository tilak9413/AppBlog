"use client";
import React from "react";

const CaseStudiesAndConnect: React.FC = () => {
  return (
    <section className="bg-white text-gray-800">
      {/* ======================= Case Studies Section ======================= */}
      <div className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#3d466e] mb-8 text-center sm:text-left">
          Case Studies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Case Study 1 */}
          <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-medium text-[#3d466e] text-sm sm:text-base mb-2">
              Accounting Setup For A Construction Company
            </h3>
            <a
              href="#"
              className="text-xs sm:text-sm text-[#3d466e] font-semibold hover:underline"
            >
              View Case Study →
            </a>
          </div>

          {/* Case Study 2 */}
          <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-medium text-[#3d466e] text-sm sm:text-base mb-2">
              ECommerce Tax & Compliance For CPA Firm Supporting Subscription Box Brands
            </h3>
            <a
              href="#"
              className="text-xs sm:text-sm text-[#3d466e] font-semibold hover:underline"
            >
              View Case Study →
            </a>
          </div>

          {/* Case Study 3 */}
          <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-medium text-[#3d466e] text-sm sm:text-base mb-2">
              Accounting Support For CPA Firm Serving Biotech Startups
            </h3>
            <a
              href="#"
              className="text-xs sm:text-sm text-[#3d466e] font-semibold hover:underline"
            >
              View Case Study →
            </a>
          </div>

          {/* Case Study 4 */}
          <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-medium text-[#3d466e] text-sm sm:text-base mb-2">
              Workflow Automation For CPA Firm Serving Construction Clients
            </h3>
            <a
              href="#"
              className="text-xs sm:text-sm text-[#3d466e] font-semibold hover:underline"
            >
              View Case Study →
            </a>
          </div>
        </div>
      </div>

      {/* ======================= Let's Connect Section ======================= */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with diagonal dashed pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
           style={{
            backgroundImage:
              "url(https://cdn.prod.website-files.com/6718c309cc349b579872ddbb/6736f52aa2dea93969a896f8_line_cta.svg)",
              backgroundSize: "100px 100px",
            }

          }
        
        ></div>

        {/* Center content */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="bg-[#d5e6d1] rounded-md shadow-[4px_4px_0_#000] border border-black text-center px-10 py-14 max-w-xl w-full mx-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#3d466e] mb-4">
              Let’s Connect!
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-8">
              Connect with our accounting professionals & get started today!
            </p>

            <button className="px-6 py-3 bg-[#3d466e] text-white rounded-md hover:bg-[#2f3859] transition-all shadow-md">
              Hire Talent
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CaseStudiesAndConnect;
