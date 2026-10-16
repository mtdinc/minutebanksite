// "Start Focusing Today": the final download CTA

import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import DownloadButton from "./DownloadButton";
import DownloadQrCard from "./DownloadQrCard";
import { TRIAL_LENGTH_TEXT } from "../lib/pricing";

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Section scales up and fades in
      gsap.from(".cta-content", {
        opacity: 0,
        scale: 0.95,
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

  return (
    <section ref={containerRef} className="bg-[#f0f0ed] py-20 lg:py-28">
      <div className="cta-content max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        {/* Heading */}
        <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-medium text-[#1a1a1a] leading-[1.1]">
          Start Focusing Today
        </h2>

        {/* Platform line */}
        <p className="mt-4 text-[16px] lg:text-[17px] text-[#71717a]">
          Works on iPhone, iPad, Mac, and Apple Watch. Try it free for {TRIAL_LENGTH_TEXT}.
        </p>

        {/* CTA button */}
        <div className="mt-10 flex flex-col items-center gap-8">
          <DownloadButton showAppleIcon />

          {/* QR code block */}
          <DownloadQrCard className="mx-auto w-fit" />
        </div>
      </div>
    </section>
  );
}
