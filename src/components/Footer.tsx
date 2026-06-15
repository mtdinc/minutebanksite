import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-[#e0e0dd] bg-[#f7f7f5] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-medium text-[#1a9e94] text-[14px]">MinuteBank</span>
            <span className="text-[#d0d0cd]">|</span>
            <span className="text-[#888888] text-[13px]">&copy; 2026 Berfin Aydin</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/help"
              className="text-[#71717a] text-[13px] hover:text-[#1a9e94] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
            >
              Help &amp; FAQ
            </Link>
            <Link
              to="/privacy"
              className="text-[#71717a] text-[13px] hover:text-[#1a9e94] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[#71717a] text-[13px] hover:text-[#1a9e94] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:support@minutebank.app"
              className="text-[#71717a] text-[13px] hover:text-[#1a9e94] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
