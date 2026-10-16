// "Free for 14 days. Then pick your plan." pricing section.
// Every price, list, and note comes from src/lib/pricing.ts.

import { useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import DownloadButton from './DownloadButton';
import {
  PRICES,
  TRIAL_LENGTH_TEXT,
  TRIAL_LENGTH_ADJECTIVE,
  EVERY_PLAN_INCLUDES,
  LIFETIME_TERM_TEXT,
  REGION_NOTE,
} from '../lib/pricing';

interface Plan {
  name: string;
  price: string;
  period: string;
  note: string;
  isHero: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Yearly',
    price: PRICES.yearly,
    period: 'a year',
    note: `${capitalize(TRIAL_LENGTH_TEXT)} free for new subscribers, then ${PRICES.yearly} a year.`,
    isHero: true,
  },
  {
    name: 'Monthly',
    price: PRICES.monthly,
    period: 'a month',
    note: 'No trial. Cancel any time.',
    isHero: false,
  },
  {
    name: 'Lifetime',
    price: PRICES.lifetime,
    period: 'once',
    note: `Pay once. ${LIFETIME_TERM_TEXT}`,
    isHero: false,
  },
];

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function IncludesCard({ label, items }: { label: string; items: React.ReactNode[] }) {
  return (
    <div className="pricing-reveal bg-white rounded-2xl p-7 lg:p-8 border border-[#e8e8e5] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      <p className="text-[#e87a55] text-[12px] font-medium tracking-[3px] uppercase mb-5">
        {label}
      </p>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-[#1a1a1a] text-[15px] leading-[1.6]">
            <Check className="w-4 h-4 mt-1 flex-shrink-0 text-[#1a9e94]" strokeWidth={2.5} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const frame = plan.isHero
    ? 'border-[#1a9e94] shadow-[0px_12px_40px_0px_rgba(26,158,148,0.14),0px_4px_12px_0px_rgba(0,0,0,0.06)]'
    : 'border-[#e8e8e5] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.06),0px_2px_8px_0px_rgba(0,0,0,0.04)]';

  return (
    <div className={`pricing-reveal relative bg-white rounded-2xl p-7 lg:p-8 border ${frame} flex flex-col`}>
      {plan.isHero && (
        <span className="absolute -top-3 left-7 px-3 py-1 bg-[#1a9e94] text-white text-[11px] font-medium tracking-[0.12em] uppercase rounded-full">
          {capitalize(TRIAL_LENGTH_TEXT)} free
        </span>
      )}
      <p className="text-[#71717a] text-[13px] tracking-[0.12em] uppercase font-medium mb-3">
        {plan.name}
      </p>
      <p className="flex items-baseline gap-2 mb-3">
        <span className="text-[#1a1a1a] text-[36px] lg:text-[40px] font-medium leading-none tabular-nums">
          {plan.price}
        </span>
        <span className="text-[#71717a] text-[14px]">{plan.period}</span>
      </p>
      <p className="text-[#71717a] text-[14px] leading-[1.6]">{plan.note}</p>
    </div>
  );
}

export default function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Cards rise into place as the section scrolls in
      gsap.from('.pricing-reveal', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="w-full bg-[#f7f7f5] py-20 lg:py-28 scroll-mt-[60px]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="pricing-reveal text-center mb-12 lg:mb-16">
          <p className="text-[#e87a55] text-[12px] font-medium tracking-[3px] uppercase mb-4">
            Pricing
          </p>
          <h2
            className="font-medium text-[#1a1a1a] text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.1] mb-5"
            style={{ textWrap: 'balance' }}
          >
            Free for {TRIAL_LENGTH_TEXT}. Then pick your plan.
          </h2>
          <p className="text-[#71717a] text-[16px] lg:text-[17px] leading-[1.7] max-w-2xl mx-auto">
            On iPhone and iPad, MinuteBank starts with a {TRIAL_LENGTH_ADJECTIVE} free trial on the yearly plan.
            After that, choose yearly, monthly, or lifetime. Every plan includes everything below,
            and one purchase covers iPhone, iPad, and Mac.
          </p>
        </div>

        {/* What every plan includes */}
        <div className="max-w-2xl mx-auto mb-12 lg:mb-16">
          <IncludesCard label="Every plan includes" items={EVERY_PLAN_INCLUDES} />
          <p className="pricing-reveal mt-4 text-center text-[#71717a] text-[13px]">
            The Mac menu bar app also works without Pro, with the focus timer, coins, goals, and time banks.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Notes */}
        <div className="pricing-reveal mt-8 text-center space-y-2">
          <p className="text-[#71717a] text-[13px]">{REGION_NOTE}</p>
        </div>

        {/* CTA */}
        <div className="pricing-reveal mt-10 flex justify-center">
          <DownloadButton showAppleIcon />
        </div>
      </div>
    </section>
  );
}
