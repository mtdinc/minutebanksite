import { useRef } from 'react';
import { Watch, Smartphone, Tablet, Monitor } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { IPhone17Mockup } from './DeviceMockups';
import { gsap, useGSAP } from '../lib/gsap';
import { ACTIVE_DOWNLOAD_URL, QR_CARD_TITLE, IOS_REQUIREMENT_TEXT } from '../lib/downloadLinks';
import homeMockup from '../assets/home_mockup.webp';

const HERO_CIRCLE_RADII = [150, 300, 450, 600, 750, 900];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: full pinned scroll storytelling
    mm.add(
      {
        isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px), (prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop } = context.conditions!;

        // Animate circle dash offsets (CSS-like infinite loop)
        gsap.utils.toArray<SVGCircleElement>(".hero-circle").forEach((circle, i) => {
          gsap.to(circle, {
            strokeDashoffset: i % 2 === 0 ? -40 : 40,
            duration: 2,
            repeat: -1,
            ease: "none",
          });
        });

        if (!isDesktop) return;

        // Pinned hero timeline — scrubbed by scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 1,
            pin: true,
          },
        });

        // Text content fades out and moves up with parallax
        tl.to(".hero-text", {
          opacity: 0,
          y: -60,
          ease: "power1.in",
        }, 0);

        // Phone mockup scales up subtly for depth
        tl.to(".hero-phone", {
          scale: 1.08,
          y: -20,
          ease: "power1.out",
        }, 0);

        // Circle background fades and expands
        tl.to(".hero-circles", {
          opacity: 0,
          scale: 1.15,
          ease: "power1.in",
        }, 0);

        // QR block fades faster than main text
        tl.to(".hero-qr", {
          opacity: 0,
          y: -30,
          ease: "power1.in",
        }, 0);
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full min-safe-screen bg-[#f7f7f5] overflow-hidden pt-[60px]">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern pointer-events-none z-0" />

      {/* Concentric circle background */}
      <div className="hero-circles absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <svg
          className="absolute opacity-30"
          width="200%"
          height="200%"
          viewBox="0 0 2000 2000"
          style={{ minWidth: '2000px', minHeight: '2000px' }}
        >
          {HERO_CIRCLE_RADII.map((radius) => (
            <circle
              key={radius}
              className="hero-circle"
              cx="1000"
              cy="1000"
              r={radius}
              fill="none"
              stroke="#e87a55"
              strokeWidth="2"
              strokeDasharray="20 20"
            />
          ))}
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative flex items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-14 py-4 max-w-[1300px] mx-auto min-safe-screen-minus-nav">
        <HeroContent />
      </div>
    </section>
  );
}

function HeroContent() {
  const qrCardTitle = QR_CARD_TITLE;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20 xl:gap-28 w-full">

      {/* Text Content - Left */}
      <div className="hero-text flex flex-col items-center lg:items-start text-center lg:text-left z-20 max-w-[640px] flex-1">
        {/* Platform badge */}
        <div className="relative flex items-center gap-1.5 sm:gap-3 mb-6 text-[11px] sm:text-[15px] tracking-[0.08em] sm:tracking-[0.15em] uppercase font-medium whitespace-nowrap">
          <div className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-full platform-glow-bg pointer-events-none" />
          <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-[#e87a55]" aria-hidden="true" />
          <span className="text-[#c96a48] platform-glow-text">iPhone</span>
          <span className="text-[#e87a55]/30">&middot;</span>
          <Tablet className="w-3 h-3 sm:w-4 sm:h-4 text-[#e87a55]" aria-hidden="true" />
          <span className="text-[#c96a48] platform-glow-text">iPad</span>
          <span className="text-[#e87a55]/30">&middot;</span>
          <Monitor className="w-3 h-3 sm:w-4 sm:h-4 text-[#e87a55]" aria-hidden="true" />
          <span className="text-[#c96a48] platform-glow-text">Mac</span>
          <span className="text-[#e87a55]/30">&middot;</span>
          <Watch className="w-3 h-3 sm:w-4 sm:h-4 text-[#e87a55]" aria-hidden="true" />
          <span className="text-[#c96a48] platform-glow-text">Watch</span>
        </div>

        {/* Headline */}
        <div className="mb-6">
          <h1 className="font-medium leading-[1.15] text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px]" style={{ textWrap: 'balance' }}>
            <span className="text-[#1a1a1a]">Lock Your Apps.</span>
            <br />
            <span className="text-[#1a9e94] terminal-cursor">Earn Them Back</span>
          </h1>
        </div>

        {/* Sub-statement */}
        <p className="font-normal text-[#71717a] leading-[1.7] mb-6 lg:mb-10 max-w-[520px] text-[15px] sm:text-[17px]">
          MinuteBank blocks your distracting apps at the OS level and makes you earn coins through focused work to unlock them. Your wallet caps at 450 coins, your daily streak only grows when you show up, and your friends can see everything. Procrastination finally has consequences.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={ACTIVE_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-[260px] h-[56px] bg-[#e87a55] text-white font-medium text-[16px] tracking-wide cursor-pointer cta-glow border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded hover:scale-[1.03] active:scale-[0.97] transition-transform no-underline"
          >
            Download
          </a>

          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[#71717a] text-[14px] hover:text-[#1a1a1a] transition-colors cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded hover:translate-x-1 transition-transform"
          >
            See how it works &rarr;
          </button>
        </div>

        {/* QR Code */}
        <a
          href={ACTIVE_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-qr hidden sm:flex items-center gap-4 mt-8 border border-[#e0e0dd] bg-white/80 backdrop-blur-sm px-5 py-4 cursor-pointer hover:border-[#ccc] transition-colors text-left no-underline"
        >
          <div className="flex-shrink-0 p-1.5 bg-white border border-[#e8e8e5]">
            <QRCodeSVG
              value={ACTIVE_DOWNLOAD_URL}
              size={72}
              bgColor="#ffffff"
              fgColor="#1a1a1a"
              level="M"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Smartphone className="w-3 h-3 text-[#888888]" aria-hidden="true" />
              <span className="text-[#888888] text-[10px] tracking-[0.15em] uppercase">
                Scan with your phone
              </span>
            </div>
            <p className="text-[#1a1a1a] text-[13px] font-medium">
              {qrCardTitle}
            </p>
            <p className="text-[#888888] text-[11px]">
              {IOS_REQUIREMENT_TEXT}
            </p>
          </div>
        </a>
      </div>

      {/* Phone Mockup - Right */}
      <div className="hero-phone flex flex-shrink-0 items-center justify-center z-20">
        <IPhone17Mockup
          screenshot={homeMockup}
          alt="MinuteBank app home screen showing today's progress, coin wallet, and tag goals"
          className="scale-[0.7] sm:scale-[0.8] lg:scale-[1] xl:scale-[1.1]"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
