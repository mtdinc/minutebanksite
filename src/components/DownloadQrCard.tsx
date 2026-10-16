// "Scan with your phone" card that opens the download page. It shows from the
// sm breakpoint up; on a phone the Download button is the way in. Callers pass
// layout classes, and the hero also passes `hero-qr`, which its GSAP timeline animates.

import { Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ACTIVE_DOWNLOAD_URL, QR_CARD_TITLE, IOS_REQUIREMENT_TEXT } from '../lib/downloadLinks';

export default function DownloadQrCard({ className }: { className: string }) {
  return (
    <a
      href={ACTIVE_DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hidden sm:flex items-center gap-4 border border-[#e0e0dd] bg-white/80 backdrop-blur-sm px-5 py-4 cursor-pointer hover:border-[#ccc] transition-colors text-left no-underline`}
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
          {QR_CARD_TITLE}
        </p>
        <p className="text-[#888888] text-[11px]">
          {IOS_REQUIREMENT_TEXT}
        </p>
      </div>
    </a>
  );
}
