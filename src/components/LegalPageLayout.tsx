// Shared layout for /privacy and /terms pages.
// Minimal header with logo + back link, readable single column, reuses Footer.

import { Link } from 'react-router';
import Footer from './Footer';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#f7f7f5]">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-[#f7f7f5]/85 backdrop-blur-md border-b border-[#e0e0dd]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="h-[60px] max-w-3xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="font-medium text-[16px] tracking-[0.12em] uppercase hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
          >
            <span className="font-bold text-[#B85C3A]">Minute</span>
            <span className="font-normal text-[#1a1a1a]">Bank</span>
          </Link>
          <Link
            to="/"
            className="text-[#71717a] text-[13px] hover:text-[#1a1a1a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      {/* Legal content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-12 lg:py-20">
        <h1 className="font-medium text-[#1a1a1a] text-[28px] lg:text-[36px] mb-2">
          {title}
        </h1>
        <p className="text-[#888888] text-[13px] mb-10">
          Last updated: {lastUpdated}
        </p>

        <div className="space-y-8 text-[#555555] text-[14px] lg:text-[15px] leading-[1.8]">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
