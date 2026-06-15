// Fallback page for minutebank.app/join/<code>.
// Users see this only if the iOS app is NOT installed (Universal Links didn't intercept).
// Shows the invite code and links to download the app.

import { useParams, Link } from 'react-router';
import { IS_APP_STORE_DOWNLOAD, ACTIVE_DOWNLOAD_URL } from '../lib/downloadLinks';

export default function JoinGroupPage() {
  const { code } = useParams<{ code: string }>();
  // Format code for display (ensure XXXX-XXXX format)
  const displayCode = formatCode(code ?? '');

  let downloadButtonText = 'Get MinuteBank in TestFlight';
  if (IS_APP_STORE_DOWNLOAD) {
    downloadButtonText = 'Download MinuteBank from the App Store';
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex flex-col items-center justify-center px-6">
      {/* Card */}
      <div className="max-w-md w-full bg-white border border-[#e0e0dd] rounded-2xl p-8 text-center shadow-sm">
        {/* App icon / branding */}
        <div className="text-4xl mb-4">&#x1F4DA;</div>

        <h1 className="font-mono font-bold text-[#1a1a1a] text-xl mb-2">
          You've been invited to a study group
        </h1>

        <p className="font-mono text-[#71717a] text-sm mb-6">
          Open this link on your iPhone to join instantly, or download MinuteBank first.
        </p>

        {/* Invite code display */}
        <div className="bg-[#f7f7f5] border border-[#e0e0dd] rounded-xl py-4 px-6 mb-6">
          <p className="font-mono text-[#71717a] text-xs mb-1 tracking-wider uppercase">
            Invite Code
          </p>
          <p className="font-mono font-bold text-[#e87a55] text-2xl tracking-widest">
            {displayCode}
          </p>
        </div>

        {/* App Store link */}
        <a
          href={ACTIVE_DOWNLOAD_URL}
          className="inline-block w-full bg-[#1a1a1a] text-white font-mono font-semibold text-sm py-3 px-6 rounded-xl hover:bg-[#333] transition-colors mb-3"
        >
          {downloadButtonText}
        </a>

        <p className="font-mono text-[#71717a] text-xs">
          After installing, open this link again to join the group.
        </p>
      </div>

      {/* Back to home */}
      <Link
        to="/"
        className="font-mono text-[#71717a] text-sm mt-6 hover:text-[#1a1a1a] transition-colors"
      >
        &larr; Learn more about MinuteBank
      </Link>
    </div>
  );
}

// Ensures the code is displayed as XXXX-XXXX even if the URL has it differently
function formatCode(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (cleaned.length > 4) {
    return cleaned.slice(0, 4) + '-' + cleaned.slice(4, 8);
  }
  return cleaned;
}
