import { useRef } from 'react';
import { Link } from 'react-router';
import { gsap, useGSAP } from '../lib/gsap';

export default function PrivacyPolicySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".privacy-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".privacy-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="privacy" className="relative w-full bg-[#f7f7f5] py-12 lg:py-28 scroll-mt-[60px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* ── Privacy Policy (condensed) ── */}
        <div
          id="privacy-policy"
          className="privacy-card border-2 border-dashed border-[#d0d0cd] bg-white p-8 lg:p-12 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)]"
        >
          <h2 className="font-normal text-[#1a1a1a] text-[28px] lg:text-[32px] mb-10" style={{ textWrap: 'balance' }}>
            Your Data, Explained Simply
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Cloud data */}
            <div>
              <h3 className="font-normal text-[#1a9e94] text-[14px] mb-4 tracking-wide">
                CLOUD DATA (SYNCED)
              </h3>
              <ul className="space-y-2">
                {[
                  'Name, email, and account ID',
                  'Study sessions, timer activity, and progress',
                  'Goals, tags, settings, and device IDs for sync',
                  'Friends, groups, and invite records you create',
                  'Profile content like your username and avatar',
                ].map((item) => (
                  <li key={item} className="font-normal text-[#888888] text-[13px] flex items-start">
                    <span className="text-[#e87a55] mr-2 mt-0.5">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* On-device only */}
            <div>
              <h3 className="font-normal text-[#1a9e94] text-[14px] mb-4 tracking-wide">
                ON-DEVICE ONLY
              </h3>
              <ul className="space-y-2">
                {[
                  'Which apps you block (App Lock)',
                  'App usage time for limits',
                  'Widget, Live Activity, and Apple Watch state',
                ].map((item) => (
                  <li key={item} className="font-normal text-[#888888] text-[13px] flex items-start">
                    <span className="text-[#1a9e94] mr-2 mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Never collected */}
            <div>
              <h3 className="font-normal text-[#1a9e94] text-[14px] mb-4 tracking-wide">
                NOT COLLECTED / NO ADS
              </h3>
              <ul className="space-y-2">
                {[
                  'Exact GPS location or a location permission prompt',
                  'Your iPhone address book or photo library',
                  'Your browsing history',
                  'Any data for ad targeting or cross-app tracking',
                ].map((item) => (
                  <li key={item} className="font-normal text-[#888888] text-[13px] flex items-start">
                    <span className="text-[#dc3545] mr-2 mt-0.5">&times;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key notes */}
          <div className="space-y-4 mb-8">
            <div className="border-l-2 border-[#1a9e94] pl-5">
              <p className="font-normal text-[#777777] text-[13px] leading-relaxed">
                <span className="text-[#555555] font-medium">App Lock:</span> Uses Apple's FamilyControls framework. Your app selections are stored as opaque tokens. We literally cannot see which apps you chose. This data never leaves your device.
              </p>
            </div>
            <div className="border-l-2 border-[#1a9e94] pl-5">
              <p className="font-normal text-[#777777] text-[13px] leading-relaxed">
                <span className="text-[#555555] font-medium">Social features:</span> Friends, groups, and invites come from connections you create inside MinuteBank. We do not read your iPhone address book.
              </p>
            </div>
            <div className="border-l-2 border-[#1a9e94] pl-5">
              <p className="font-normal text-[#777777] text-[13px] leading-relaxed">
                <span className="text-[#555555] font-medium">Sign-in &amp; security:</span> Data syncs to Supabase with row-level security. We show no ads and do not use your advertising identifier; we use Airbridge to measure how well our own install campaigns perform through Apple's SKAdNetwork. Crash and diagnostic reports go to Sentry with IP address stripped and no account or username attached. If you choose Google Sign-In, Google may process your IP address to estimate general location for fraud prevention.
              </p>
            </div>
          </div>

          {/* Rights + Contact */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pt-6 border-t border-[#e0e0dd]">
            <div>
              <h3 className="font-normal text-[#1a1a1a] text-[16px] mb-2">Your Rights (GDPR & CCPA)</h3>
              <p className="text-[#777777] text-[13px] leading-relaxed">
                Access, correct, delete, or export your data anytime from Settings. Account deletion removes all cloud data within 30 days.
              </p>
            </div>
            <div className="flex-shrink-0">
              <h3 className="font-normal text-[#1a1a1a] text-[16px] mb-2">Contact</h3>
              <a
                href="mailto:support@minutebank.app"
                className="text-[#e87a55] text-[13px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
              >
                support@minutebank.app
              </a>
            </div>
          </div>

          {/* Full legal pages links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-[#e0e0dd] mt-8">
            <Link
              to="/privacy"
              className="text-[#e87a55] text-[13px] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
            >
              Read Full Privacy Policy &rarr;
            </Link>
            <span className="hidden sm:inline text-[#d0d0cd]">|</span>
            <Link
              to="/terms"
              className="text-[#e87a55] text-[13px] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
            >
              Terms of Service &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
