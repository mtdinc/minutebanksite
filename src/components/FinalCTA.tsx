// "Start Focusing Today" — Final download CTA

import { useRef } from "react";
import { Apple, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { gsap, useGSAP } from "../lib/gsap";
import { ACTIVE_DOWNLOAD_URL, QR_CARD_TITLE, IOS_REQUIREMENT_TEXT } from "../lib/downloadLinks";

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const qrCardTitle = QR_CARD_TITLE;

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
          Free on iPhone, iPad, Mac, and Apple Watch. Your focus, everywhere.
        </p>

        {/* CTA button */}
        <div className="mt-10 flex flex-col items-center gap-8">
          <a
            href={ACTIVE_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-[260px] h-[56px] bg-[#e87a55] text-white font-medium text-[16px] tracking-wide cursor-pointer cta-glow border-none rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 hover:scale-[1.03] active:scale-[0.97] transition-transform no-underline"
          >
            <Apple className="w-5 h-5" aria-hidden="true" />
            Download
          </a>

          {/* QR code block */}
          <a
            href={ACTIVE_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-4 mx-auto w-fit border border-[#e0e0dd] bg-white/80 backdrop-blur-sm px-5 py-4 cursor-pointer hover:border-[#ccc] transition-colors text-left no-underline"
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
            <div className="text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <Smartphone className="w-3 h-3 text-[#888]" aria-hidden="true" />
                <span className="text-[#888] text-[10px] tracking-[0.15em] uppercase">
                  Scan with your phone
                </span>
              </div>
              <p className="text-[#1a1a1a] text-[13px] font-medium">
                {qrCardTitle}
              </p>
              <p className="text-[#888] text-[11px]">
                {IOS_REQUIREMENT_TEXT}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
