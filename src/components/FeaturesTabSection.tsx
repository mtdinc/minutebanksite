// Tabbed feature showcase — compact two-column layout
// All tab panels pre-rendered, GSAP crossfades between them (no DOM swap = no flicker)

import { useCallback, useRef, useState } from "react";
import { Timer, Lock, Sparkles, type LucideIcon } from "lucide-react";
import { IPhone17Mockup } from "./DeviceMockups";
import { gsap, useGSAP } from "../lib/gsap";
import timerScreenshot from "../assets/timerScreen.png";
import enduranceMockup from "../assets/endurance_mockup.webp";
import vaultMockup from "../assets/vault_mockup.webp";

// ─── Tab definitions ─────────────────────────────────────────

interface TabContent {
  label: string;
  icon: LucideIcon;
  heading: string;
  subtext: string;
  screenshot: string;
  screenshotAlt: string;
}

const tabs: TabContent[] = [
  {
    label: "Timer Modes",
    icon: Timer,
    heading: "Every Way to Focus",
    subtext: "Countdown, count-up, or endurance. Whatever mode you need, we have it. Pick whichever depending on your mood.",
    screenshot: enduranceMockup,
    screenshotAlt: "Endurance mode timer screen",
  },
  {
    label: "Vault",
    icon: Lock,
    heading: "Lock Your Distractions",
    subtext: "Block distracting apps at the OS level. Built-in friction makes you think twice before opening them.",
    screenshot: vaultMockup,
    screenshotAlt: "App Lock screen with blocked apps",
  },
  {
    label: "Simple Mode",
    icon: Sparkles,
    heading: "Just a Timer, Nothing More",
    subtext: "If you want it simple, strip away everything. No coins, no blocking, no streak pressure. Just a timer and tracker that syncs everywhere.",
    screenshot: timerScreenshot,
    screenshotAlt: "Clean minimal timer screen",
  },
];

// ─── Bullet component ────────────────────────────────────────

function FeatureBullet({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-[rgba(232,122,85,0.08)] flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#e87a55]" aria-hidden="true" />
      </div>
      <div>
        <h4 className="text-[17px] font-medium text-[#1a1a1a] mb-1">{title}</h4>
        <p className="text-[15px] leading-[1.6] text-[#71717a]">{description}</p>
      </div>
    </div>
  );
}

// ─── Panel content ───────────────────────────────────────────

function TimerModesBullets() {
  return (
    <div className="space-y-4">
      <FeatureBullet icon={Timer} title="Countdown" description="Classic Pomodoro. Set a duration, focus, earn." />
      <FeatureBullet icon={Timer} title="Count-up" description="Open-ended. Start and stop when you're done. Great for creative work." />
      <FeatureBullet icon={Timer} title="Endurance (Unique Pomodoro)" description="25-minute study blocks with escalating breaks (5 → 7 → 10 → 15 min). Multiplier climbs from 1.0x to 2.0x." />
    </div>
  );
}

function VaultBullets() {
  return (
    <div className="space-y-4">
      <FeatureBullet icon={Lock} title="Block any app" description="Block any app on your phone until you've earned enough study time." />
      <FeatureBullet icon={Lock} title="Auto-lock" description="Apps lock automatically when time runs out." />
      <FeatureBullet icon={Lock} title="Intentional friction" description="Want to open a blocked app? A breathing exercise gives you a moment to pause and reconsider." />
    </div>
  );
}

function SimpleModeBullets() {
  return (
    <div className="space-y-4">
      <FeatureBullet icon={Sparkles} title="Clean & minimal" description="Turn off coins, blocking, and gamification. Just a timer and your focus stats." />
      <FeatureBullet icon={Sparkles} title="Cross-device sync" description="Still syncs across all your devices." />
      <FeatureBullet icon={Sparkles} title="Your choice" description="As simple or as powerful as you want." />
    </div>
  );
}

const PanelComponents = [TimerModesBullets, VaultBullets, SimpleModeBullets];

// ─── Tab bar ─────────────────────────────────────────────────

function TabBar({ activeIndex, onSelect }: { activeIndex: number; onSelect: (i: number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:flex lg:flex-wrap lg:gap-2" role="tablist" aria-label="Feature categories">
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        const Icon = tab.icon;
        return (
          <button
            key={tab.label}
            id={`feature-tab-${index}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`feature-panel-${index}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            className={`
              flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-4 py-2.5 rounded-full text-[13px] sm:text-[14px] font-medium
              whitespace-nowrap transition-all duration-200 cursor-pointer border w-full lg:w-auto
              ${isActive
                ? "bg-[#e87a55] text-white border-[#e87a55]"
                : "bg-white text-[#71717a] border-[#e0e0dd] hover:border-[#e87a55]/30 hover:text-[#1a1a1a]"
              }
            `}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────

export default function FeaturesTabSection() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Refs for crossfade targets — all panels stay in DOM, GSAP handles visibility
  const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const subtextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Section entrance animation
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  // GSAP crossfade on tab change — no DOM swapping, no flicker
  const handleTabChange = useCallback((newIndex: number) => {
    if (newIndex === activeTab) return;

    // Mobile/tablet: use normal document flow. The desktop crossfade stack is what caused
    // the overlapping heights and chip collisions on smaller screens.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setActiveTab(newIndex);
      return;
    }

    const duration = 0.25;
    const ease = "power2.out";

    // Fade out current content
    const currentTargets = [
      mockupRefs.current[activeTab],
      headingRefs.current[activeTab],
      subtextRefs.current[activeTab],
      panelRefs.current[activeTab],
    ].filter(Boolean);

    const nextTargets = [
      mockupRefs.current[newIndex],
      headingRefs.current[newIndex],
      subtextRefs.current[newIndex],
      panelRefs.current[newIndex],
    ].filter(Boolean);

    // Kill any in-progress crossfade tweens
    gsap.killTweensOf(currentTargets);
    gsap.killTweensOf(nextTargets);

    // Fade out old, fade in new with a slight overlap
    gsap.to(currentTargets, {
      autoAlpha: 0,
      duration: duration * 0.6,
      ease,
      onComplete: () => {
        // After fade-out, swap the state so aria attributes update
        setActiveTab(newIndex);
      },
    });

    gsap.fromTo(nextTargets,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration, ease, delay: duration * 0.4 }
    );
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      id="features"
      className="bg-[#f7f7f5] py-16 lg:py-24 scroll-mt-[60px]"
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <div className="order-2 lg:order-1">
            <div className="flex justify-center lg:hidden">
              <IPhone17Mockup
                screenshot={tabs[activeTab].screenshot}
                alt={tabs[activeTab].screenshotAlt}
              />
            </div>

            <div className="hidden lg:flex justify-center lg:justify-start relative">
              {tabs.map((tab, i) => (
                <div
                  key={`mockup-${i}`}
                  ref={el => { mockupRefs.current[i] = el; }}
                  className={i === 0 ? "" : "absolute inset-0 flex justify-center lg:justify-start"}
                  style={{ visibility: i === activeTab ? "visible" : "hidden", opacity: i === activeTab ? 1 : 0 }}
                >
                  <IPhone17Mockup
                    screenshot={tab.screenshot}
                    alt={tab.screenshotAlt}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right column: header + tabs + panel content */}
          <div className="order-1 lg:order-2">
            <p className="text-[#e87a55] text-[12px] font-medium tracking-[3px] uppercase mb-4">
              No learning curve
            </p>

            {/* Mobile/tablet: active content in normal flow */}
            <div className="lg:hidden">
              <h2
                className="font-medium text-[#1a1a1a] text-[28px] sm:text-[32px] leading-[1.1] mb-4"
                style={{ textWrap: "balance" }}
              >
                {tabs[activeTab].heading}
              </h2>

              <p className="text-[#71717a] text-[15px] sm:text-[16px] leading-[1.7] mb-8">
                {tabs[activeTab].subtext}
              </p>
            </div>

            {/* Desktop: pre-rendered stack for GSAP crossfade */}
            <div className="hidden lg:block">
              <div className="min-h-[72px] lg:h-[55px] mb-4 relative">
                {tabs.map((tab, i) => (
                  <h2
                    key={`heading-${i}`}
                    ref={el => { headingRefs.current[i] = el; }}
                    className={`font-medium text-[#1a1a1a] text-[32px] lg:text-[40px] leading-[1.1] ${i === 0 ? "" : "absolute top-0 left-0 right-0"}`}
                    style={{ visibility: i === activeTab ? "visible" : "hidden", opacity: i === activeTab ? 1 : 0, textWrap: "balance" }}
                  >
                    {tab.heading}
                  </h2>
                ))}
              </div>

              <div className="min-h-[96px] lg:h-[70px] mb-8 relative">
                {tabs.map((tab, i) => (
                  <p
                    key={`subtext-${i}`}
                    ref={el => { subtextRefs.current[i] = el; }}
                    className={`text-[#71717a] text-[16px] lg:text-[17px] leading-[1.7] max-w-[520px] ${i === 0 ? "" : "absolute top-0 left-0 right-0"}`}
                    style={{ visibility: i === activeTab ? "visible" : "hidden", opacity: i === activeTab ? 1 : 0 }}
                  >
                    {tab.subtext}
                  </p>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-10 sm:mb-8">
              <TabBar activeIndex={activeTab} onSelect={handleTabChange} />
            </div>

            {/* Mobile/tablet: active panel only */}
            <div className="max-w-[480px] lg:hidden">
              <div
                id={`feature-panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`feature-tab-${activeTab}`}
              >
                {(() => {
                  const ActivePanel = PanelComponents[activeTab];
                  return <ActivePanel />;
                })()}
              </div>
            </div>

            {/* Desktop: pre-rendered, crossfaded panels */}
            <div className="hidden lg:block max-w-[480px] relative">
              {PanelComponents.map((Panel, i) => (
                <div
                  key={`panel-${i}`}
                  ref={el => { panelRefs.current[i] = el; }}
                  id={`feature-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`feature-tab-${i}`}
                  className={i === 0 ? "" : "absolute top-0 left-0 right-0"}
                  style={{ visibility: i === activeTab ? "visible" : "hidden", opacity: i === activeTab ? 1 : 0 }}
                >
                  <Panel />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
