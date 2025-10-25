'use client';

import { Suspense, lazy } from 'react';
import ComponentLoader from '@/components/ComponentLoader';
import { Geist, Geist_Mono, Lexend } from "next/font/google";

// Lazy load footer component
const Footer = lazy(() => import("@/components/layout/Footer"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} antialiased`}>
      {children}
      <Suspense fallback={<ComponentLoader height="h-32" message="Loading footer..." />}>
        <Footer/>
      </Suspense>
    </div>
  );
}