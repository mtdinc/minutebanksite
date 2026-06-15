import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

interface FeatureRowProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

function FeatureRow({ title, description, illustration }: FeatureRowProps) {
  return (
    <div className="feature-row relative group">
      {/* Hover outline + glow */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#1a9e94]/30 group-hover:shadow-[inset_0_0_30px_rgba(26,158,148,0.03)] transition-[background-color,border-color,transform] duration-300 pointer-events-none z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Vertical dashed divider */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px">
          <svg width="1" height="100%" className="absolute left-0 top-0">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#d0d0cd" strokeWidth="1" strokeDasharray="8 6" />
          </svg>
        </div>

        {/* Left column - TEXT */}
        <div className="flex items-center justify-center py-8 lg:py-20 px-4 sm:px-8 lg:px-12 order-1">
          <div className="max-w-md">
            <h3 className="font-normal text-[#1a1a1a] text-[28px] lg:text-[32px] mb-5" style={{ textWrap: 'balance' }}>
              {title}
            </h3>
            <p className="font-normal text-[#888888] text-[15px] lg:text-[16px] leading-[1.6]">
              {description}
            </p>
          </div>
        </div>

        {/* Right column - ILLUSTRATION */}
        <div className="feature-illustration flex items-center justify-center py-4 lg:py-20 px-4 sm:px-8 lg:px-12 order-2">
          {illustration}
        </div>
      </div>
    </div>
  );
}

function AppleWatchSketch() {
  return (
    <div className="group relative inline-block" role="img" aria-label="Apple Watch app illustration">
      <svg width="450" height="350" viewBox="0 0 450 350" fill="none" className="w-full h-auto max-w-[450px]">
        <rect x="135" y="80" width="180" height="220" rx="44" stroke="#b0b0b0" strokeWidth="2.5" fill="none" opacity="0.8" />
        <rect x="135" y="80" width="180" height="220" rx="44" stroke="#2db5ab" strokeWidth="2.5" fill="none" opacity="0" className="group-hover:opacity-100 transition-opacity duration-300" />
        <rect x="139" y="84" width="172" height="212" rx="42" stroke="#c0c0c0" strokeWidth="1.2" fill="none" opacity="0.6" />
        <rect x="149" y="94" width="152" height="192" rx="36" stroke="#c0c0c0" strokeWidth="1.4" fill="none" opacity="0.5" />
        <circle cx="320" cy="150" r="8" stroke="#b0b0b0" strokeWidth="1.8" fill="none" opacity="0.8" />
        <circle cx="320" cy="150" r="5" stroke="#c0c0c0" strokeWidth="1" fill="none" opacity="0.6" />
        <line x1="317" y1="147" x2="323" y2="153" stroke="#b0b0b0" strokeWidth="0.8" opacity="0.5" />
        <rect x="317" y="190" width="9" height="18" rx="2" stroke="#b0b0b0" strokeWidth="1.4" fill="none" opacity="0.8" />
        <circle cx="225" cy="165" r="44" stroke="#999999" strokeWidth="1.5" strokeDasharray="7 5" fill="none" opacity="0.6" />
        <circle cx="225" cy="165" r="40" stroke="#c0c0c0" strokeWidth="0.8" fill="none" opacity="0.4" />
        <text x="225" y="176" fontSize="38" fontFamily="JetBrains Mono, monospace" fill="#1a1a1a" textAnchor="middle" fontWeight="600">25</text>
        <text x="225" y="191" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#999999" textAnchor="middle" letterSpacing="0.5">minutes</text>
        <rect x="165" y="230" width="120" height="34" rx="5" stroke="#e87a55" strokeWidth="1.8" fill="none" opacity="0.9" />
        <text x="225" y="252" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#e87a55" textAnchor="middle" fontWeight="600" letterSpacing="0.5">START 25 MIN</text>
      </svg>
    </div>
  );
}

function DynamicIslandSketch() {
  return (
    <div className="group relative inline-block" role="img" aria-label="Dynamic Island live activity illustration">
      <svg width="420" height="180" viewBox="0 0 420 180" fill="none" className="w-full h-auto max-w-[420px]">
        <defs>
          <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e87a55" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#e87a55" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f0a080" stopOpacity="1" />
            <stop offset="60%" stopColor="#e87a55" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e87a55" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect x="20" y="30" width="380" height="110" rx="12" stroke="#b0b0b0" strokeWidth="1.5" fill="#ffffff" opacity="0.9" />
        <rect x="20" y="30" width="380" height="110" rx="12" stroke="#2db5ab" strokeWidth="1.5" fill="none" opacity="0" className="group-hover:opacity-100 transition-opacity duration-300" />
        <rect x="25" y="35" width="370" height="100" rx="10" stroke="#d0d0cd" strokeWidth="0.8" fill="#fafaf8" opacity="0.7" />
        <text x="45" y="60" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#999999" fontWeight="400" letterSpacing="1.5">FOCUS MODE</text>
        <text x="355" y="60" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#999999" textAnchor="end" letterSpacing="1">FOCUSING...</text>
        <text x="100" y="105" fontSize="52" fontFamily="JetBrains Mono, monospace" fill="#e87a55" fontWeight="600">5:00</text>
        <text x="350" y="95" fontSize="28" fontFamily="JetBrains Mono, monospace" fill="#1a1a1a" textAnchor="end" fontWeight="600">20</text>
        <text x="350" y="115" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#999999" textAnchor="end" letterSpacing="1">EARNED</text>
        <rect x="45" y="125" width="330" height="5" rx="2.5" stroke="#d0d0cd" strokeWidth="0.6" fill="#eeeeec" />
        <rect x="45" y="125" width="270" height="5" rx="2.5" fill="url(#orangeGlow)" />
      </svg>
    </div>
  );
}

function HomeWidgetSketch() {
  return (
    <div className="group relative inline-block" role="img" aria-label="Home screen widget illustration">
      <svg width="420" height="220" viewBox="0 0 420 220" fill="none" className="w-full h-auto max-w-[420px]">
        <rect x="30" y="20" width="360" height="180" rx="20" stroke="#b0b0b0" strokeWidth="2" fill="#ffffff" opacity="0.95" />
        <rect x="30" y="20" width="360" height="180" rx="20" stroke="#e87a55" strokeWidth="2" fill="none" opacity="0" className="group-hover:opacity-100 transition-opacity duration-300" />
        <rect x="50" y="40" width="155" height="55" rx="6" stroke="#d0d0cd" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <rect x="50" y="40" width="90" height="55" rx="6" fill="#e87a55" opacity="0.06" />
        <text x="62" y="60" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="1">&#9654;</text>
        <text x="75" y="60" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#1a1a1a" fontWeight="600" letterSpacing="1">GENERAL</text>
        <text x="190" y="60" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a" textAnchor="end">12/30m</text>
        <text x="100" y="80" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="0.5">tap to start</text>
        <rect x="215" y="40" width="155" height="55" rx="6" stroke="#d0d0cd" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <rect x="215" y="40" width="60" height="55" rx="6" fill="#1a9e94" opacity="0.06" />
        <text x="227" y="60" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="1">&#9654;</text>
        <text x="240" y="60" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#1a1a1a" fontWeight="600" letterSpacing="1">STUDY</text>
        <text x="355" y="60" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a" textAnchor="end">8/25m</text>
        <text x="265" y="80" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="0.5">tap to start</text>
        <rect x="50" y="105" width="155" height="55" rx="6" stroke="#d0d0cd" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <text x="62" y="125" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="1">&#9654;</text>
        <text x="75" y="125" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#1a1a1a" fontWeight="600" letterSpacing="1">READING</text>
        <text x="190" y="125" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a" textAnchor="end">0m</text>
        <text x="100" y="145" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="0.5">tap to start</text>
        <rect x="215" y="105" width="155" height="55" rx="6" stroke="#d0d0cd" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <rect x="215" y="105" width="100" height="55" rx="6" fill="#e87a55" opacity="0.06" />
        <text x="227" y="125" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="1">&#9654;</text>
        <text x="240" y="125" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#1a1a1a" fontWeight="600" letterSpacing="1">CODING</text>
        <text x="355" y="125" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a" textAnchor="end">20/30m</text>
        <text x="265" y="145" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="#999" letterSpacing="0.5">tap to start</text>
        <circle cx="195" cy="175" r="3" fill="#e87a55" opacity="0.8" />
        <circle cx="210" cy="175" r="3" fill="#d0d0cd" />
        <circle cx="225" cy="175" r="3" fill="#d0d0cd" />
      </svg>
    </div>
  );
}

export default function FeaturesGridSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Each row reveals independently with its own ScrollTrigger
      const rows = gsap.utils.toArray<HTMLElement>(".feature-row");
      rows.forEach((row) => {
        // Row fades in
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // SVG draw-on effect for stroked elements in each row's illustration
        const strokedElements = row.querySelectorAll(
          ".feature-illustration rect[stroke]:not([fill]):not([fill='#ffffff']):not([fill='#fafaf8']):not([fill='#eeeeec']), " +
          ".feature-illustration circle[stroke], " +
          ".feature-illustration path[stroke], " +
          ".feature-illustration line[stroke]"
        );

        strokedElements.forEach((el) => {
          const svgEl = el as SVGGeometryElement;
          if (typeof svgEl.getTotalLength === "function") {
            const length = svgEl.getTotalLength();
            gsap.set(svgEl, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(svgEl, {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      });
    });
  }, { scope: containerRef });

  const features = [
    {
      title: "Home Screen Widget",
      description: "One tap to start, one tap to stop. Pick a tag from your home screen and begin studying instantly. No app to open, no screens to navigate. Your daily progress fills up right on the widget.",
      illustration: <HomeWidgetSketch />,
    },
    {
      title: "Apple Watch",
      description: "Start countdown, count-up, or Endurance sessions directly from your wrist. Watch face complications show your live timer, today's minutes, and coin balance without opening the app.",
      illustration: <AppleWatchSketch />,
    },
    {
      title: "Dynamic Island",
      description: "Live Activities project your running timer and coins earned onto your Lock Screen and Dynamic Island. Check progress at a glance without unlocking your phone.",
      illustration: <DynamicIslandSketch />,
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="absolute inset-0 bg-[#f7f7f5] z-0" />

      <div className="relative z-20 py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative">
          {/* Left edge vertical dashed border */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px">
            <svg width="1" height="100%" className="absolute left-0 top-0">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="#d0d0cd" strokeWidth="1" strokeDasharray="8 6" />
            </svg>
          </div>

          {/* Right edge vertical dashed border */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px">
            <svg width="1" height="100%" className="absolute right-0 top-0">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="#d0d0cd" strokeWidth="1" strokeDasharray="8 6" />
            </svg>
          </div>

          <div className="relative">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative">
                <FeatureRow
                  title={feature.title}
                  description={feature.description}
                  illustration={feature.illustration}
                />
                {index < features.length - 1 && (
                  <div className="w-full h-px bg-[#e0e0dd]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
