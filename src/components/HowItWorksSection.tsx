import { useRef } from 'react';
import { Timer, Coins, Lock, Trophy } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

const steps = [
  {
    number: "1",
    title: "FOCUS",
    description: "Pick your style. Pomodoro countdown, open-ended focus, or Endurance Mode. Start from your iPhone, iPad, Mac, or Apple Watch.",
    icon: Timer
  },
  {
    number: "2",
    title: "EARN",
    description: "Every minute earns coins. Your wallet caps at 450 coins, so the only way forward is to spend them. No infinite stockpile, no hoarding.",
    icon: Coins
  },
  {
    number: "3",
    title: "UNLOCK",
    description: "Spend coins in the Marketplace to unlock time for App Lock or to buy break time for your custom goals.",
    icon: Lock
  },
  {
    number: "4",
    title: "TRACK",
    description: "Build your streak. Show up daily and your master streak grows. Friends see your weekly minutes on the leaderboard and feel it when they fall behind.",
    icon: Trophy
  }
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: pinned section with cards revealing one by one
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Title reveals on entrance
      gsap.from(".how-title", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Pinned timeline — cards stagger in as user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".how-grid",
          start: "top 70%",
          end: "+=600",
          scrub: 0.8,
          pin: containerRef.current,
          pinSpacing: true,
        },
      });

      // Each card fades in and slides up sequentially
      const cards = gsap.utils.toArray<HTMLElement>(".how-card");
      cards.forEach((card, i) => {
        tl.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.out",
        }, i * 0.2);
      });

      // Progress bar fills across the full timeline
      tl.fromTo(".how-progress-fill", {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 1,
        ease: "none",
      }, 0);
    });

    // Mobile: simple stagger entrance (no pin)
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(".how-title", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".how-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".how-card", {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".how-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="how-it-works" className="relative w-full bg-[#f7f7f5] py-12 lg:py-28 xl:py-32 scroll-mt-[60px]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Title */}
        <h2
          className="how-title font-medium text-[#1a1a1a] leading-[1.1] text-center mb-6 lg:mb-8 capitalize text-[36px]"
          style={{ textWrap: 'balance' }}
        >
          How it works
        </h2>

        {/* Progress bar — fills as cards reveal */}
        <div className="hidden md:block max-w-[600px] mx-auto mb-12 lg:mb-14 xl:mb-16">
          <div className="h-[2px] bg-[#e0e0dd] rounded-full overflow-hidden">
            <div className="how-progress-fill h-full bg-[#e87a55] rounded-full origin-left" />
          </div>
        </div>

        {/* Steps grid */}
        <div className="how-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="how-card relative border border-[#e0e0dd] bg-white p-8 flex flex-col card-hover-glow shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)]"
            >
              {/* Numbered indicator */}
              <div className="mb-6">
                <span className="font-bold text-[#e87a55] text-[24px]">
                  {step.number}
                </span>
              </div>

              {/* Step title */}
              <h3 className="font-bold text-[#1a1a1a] text-[20px] mb-4 capitalize flex items-center gap-2">
                <step.icon className="w-5 h-5 text-[#1a1a1a]" aria-hidden="true" />
                {step.title}
              </h3>

              {/* Step description */}
              <p className="font-normal text-[#71717a] text-[14px] leading-[1.6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
