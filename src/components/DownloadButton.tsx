// The large orange Download button shared by the hero, pricing, and final
// sections, so its link and look stay the same everywhere it appears.

import { Apple } from 'lucide-react';
import { ACTIVE_DOWNLOAD_URL } from '../lib/downloadLinks';

export default function DownloadButton({ showAppleIcon = false }: { showAppleIcon?: boolean }) {
  return (
    <a
      href={ACTIVE_DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-[260px] h-[56px] bg-[#e87a55] text-white font-medium text-[16px] tracking-wide cursor-pointer cta-glow border-none rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 hover:scale-[1.03] active:scale-[0.97] transition-transform no-underline"
    >
      {showAppleIcon && <Apple className="w-5 h-5" aria-hidden="true" />}
      Download
    </a>
  );
}
