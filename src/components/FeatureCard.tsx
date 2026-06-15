import { Lock, Wind, Trophy, Coins } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative bg-white rounded-2xl p-7 lg:p-8 xl:p-9 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)] overflow-hidden group border border-[#e8e8e5] hover:border-[#1a9e94] hover:shadow-[0px_12px_40px_0px_rgba(26,158,148,0.12),0px_4px_12px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,box-shadow,transform] duration-300">

      {/* Subtle top accent bar — appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1a9e94] to-[#e87a55] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon in contained chip */}
      <div className="relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#f7f7f5] border border-[#e0e0dd] text-[#1a1a1a] group-hover:bg-[#1a9e94]/10 group-hover:border-[#1a9e94]/20 transition-colors duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative text-[#1a1a1a] text-[21px] lg:text-[22px] xl:text-[23px] font-medium mb-3 tracking-tight">
        {title}
      </h3>

      {/* Description — constrain line length */}
      <p className="relative text-[#71717a] text-[14px] lg:text-[14.5px] xl:text-[15px] font-normal leading-relaxed max-w-[420px]">
        {description}
      </p>
    </div>
  );
}

export function VaultIcon() {
  return <Lock size={22} strokeWidth={2} aria-hidden="true" />;
}

export function FrictionIcon() {
  return <Wind size={22} strokeWidth={2} aria-hidden="true" />;
}

export function EnduranceIcon() {
  return <Trophy size={22} strokeWidth={2} aria-hidden="true" />;
}

export function CoinIcon() {
  return <Coins size={22} strokeWidth={2} aria-hidden="true" />;
}
