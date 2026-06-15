// "Focus With Friends" — Study groups and social accountability

import { useRef } from "react";
import { Link } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";

// ─── Member data ─────────────────────────────────────────────

const members = [
  { name: "Sarah", initials: "S", minutes: 340, color: "#1a9e94" },
  { name: "Alex", initials: "A", minutes: 285, color: "#e87a55" },
  { name: "Maria", initials: "M", minutes: 260, color: "#8b5cf6" },
  { name: "Jake", initials: "J", minutes: 195, color: "#D4A017" },
  { name: "Taylor", initials: "T", minutes: 180, color: "#dc3545" },
];

const maxMinutes = members[0].minutes;

// ─── Member row ──────────────────────────────────────────────

function MemberRow({
  member,
  index,
  isTopPerformer,
}: {
  member: (typeof members)[0];
  index: number;
  isTopPerformer: boolean;
}) {
  const barWidth = (member.minutes / maxMinutes) * 100;

  return (
    <div
      className={`member-row flex items-center gap-3 py-2.5 px-3 rounded-lg ${
        isTopPerformer ? "bg-[rgba(26,158,148,0.05)]" : ""
      }`}
      data-index={index}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[12px] font-bold"
        style={{ backgroundColor: member.color }}
      >
        {member.initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#1a1a1a] text-[13px] font-medium flex items-center gap-1.5">
            {member.name}
            {isTopPerformer && <span className="text-[14px]" title="Top performer">&#x1F451;</span>}
          </span>
          <span className="text-[#71717a] text-[12px] tabular-nums font-medium">
            {member.minutes} min
          </span>
        </div>
        <div className="w-full h-[6px] bg-[#f0f0ed] rounded-full overflow-hidden">
          <div
            className="bar-fill h-full rounded-full"
            style={{ backgroundColor: member.color, width: `${barWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Group card ──────────────────────────────────────────────

function GroupCard() {
  return (
    <div
      className="groups-card w-full max-w-[400px] bg-white rounded-2xl border border-[#e0e0dd] p-6 lg:p-7 hover:-translate-y-1 transition-transform duration-250"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[#1a1a1a] text-[18px] font-bold">Exam Prep &#x1F4DA;</h3>
        <span className="text-[#71717a] text-[11px] tracking-[0.1em] uppercase border border-[#e0e0dd] px-2 py-0.5 rounded-md">
          This Week
        </span>
      </div>

      <div className="space-y-0.5">
        {members.map((member, index) => (
          <MemberRow key={member.name} member={member} index={index} isTopPerformer={index === 0} />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[#e8e8e5] flex items-center justify-between">
        <span className="text-[#888] text-[11px]">5 members &middot; 1,260 total min</span>
        <span className="text-[#1a9e94] text-[11px] font-medium">&uarr; 12% vs last week</span>
      </div>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────

export default function GroupsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Text block slides in from left
      gsap.from(".groups-text", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Bullets stagger in
      gsap.from(".groups-bullet", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".groups-bullets",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Card fades in from right
      gsap.from(".groups-card", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".groups-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Bar fills animate with scroll — scrub-linked
      gsap.from(".bar-fill", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".groups-card",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Callout fades in last
      gsap.from(".groups-callout", {
        opacity: 0,
        duration: 0.4,
        scrollTrigger: {
          trigger: ".groups-callout",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="groups"
      className="w-full bg-[#f7f7f5] py-20 lg:py-28 scroll-mt-[60px]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text block */}
          <div className="groups-text flex-1 text-center lg:text-left">
            <p className="text-[#e87a55] text-[12px] font-medium tracking-[3px] uppercase mb-4">
              Study Groups
            </p>
            <h2
              className="font-medium text-[#1a1a1a] text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.1] mb-5"
              style={{ textWrap: "balance" }}
            >
              Focus With Friends
            </h2>
            <p className="text-[#71717a] text-[16px] lg:text-[17px] leading-[1.7] max-w-[460px] mx-auto lg:mx-0 mb-8">
              Create a study group. Invite friends. See who's putting in the hours.
              It's not about competition. It's about showing up together, even when apart.
            </p>

            {/* Bullets */}
            <div className="groups-bullets space-y-4 mb-8">
              {[
                { label: "Accountability circles", desc: "When they're studying and you're not, use it to motivate yourself to get going." },
                { label: "Weekly leaderboard", desc: "See everyone's minutes at a glance. Natural motivation." },
                { label: "No pressure", desc: "Study at your own pace. The group is there when you need it." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="groups-bullet flex items-start gap-3 text-left"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a9e94] mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-[#1a1a1a] text-[15px] font-medium">{item.label}</span>
                    <span className="text-[#71717a] text-[13px]"> &middot; {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Invite callout */}
            <div className="groups-callout flex items-center gap-2 justify-center lg:justify-start">
              <Link className="w-4 h-4 text-[#888]" />
              <span className="text-[#888] text-[13px]">Invite via link. Friends join in one tap.</span>
            </div>
          </div>

          {/* Group card */}
          <div className="flex-shrink-0">
            <GroupCard />
          </div>
        </div>
      </div>
    </section>
  );
}
