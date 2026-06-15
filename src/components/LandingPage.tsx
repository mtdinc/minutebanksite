// Wraps all existing marketing page sections.
// Extracted from App.tsx to allow React Router to render
// different pages at different routes.

import NavBar from './NavBar';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import FeaturesGridSection from './FeaturesGridSection';
import FeaturesTabSection from './FeaturesTabSection';
import PlatformSyncSection from './PlatformSyncSection';
import GroupsSection from './GroupsSection';
import FinalCTA from './FinalCTA';
import PrivacyPolicySection from './PrivacyPolicySection';
import Footer from './Footer';

function SectionDivider() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
      <svg width="100%" height="1" className="block">
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#e87a55" strokeWidth="2.5" strokeDasharray="10 12" opacity="0.35" />
      </svg>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#f7f7f5]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#e87a55] focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
      </a>
      <NavBar />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <FeaturesTabSection />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <PlatformSyncSection />
        <SectionDivider />
        <GroupsSection />
        <SectionDivider />
        <FeaturesGridSection />
        <FinalCTA />
        <SectionDivider />
        <PrivacyPolicySection />
        <Footer />
      </main>
    </div>
  );
}
