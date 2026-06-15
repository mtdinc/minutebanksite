import { useRef, useEffect } from 'react';

export function IPhone17Mockup({ className = "", screenshot, video, poster, canPlay = false, alt = "App screenshot", fetchPriority }: { className?: string; screenshot?: string; video?: string; poster?: string; isActive?: boolean; canPlay?: boolean; alt?: string; fetchPriority?: "high" | "low" | "auto" }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // React bug #10389: Safari needs muted set as DOM property + attribute.
  // Set on every mount (video element is conditionally rendered).
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.defaultMuted = true;
    vid.muted = true;
  }, [canPlay]); // re-run when video element mounts/unmounts

  return (
    <div className={`relative w-[300px] h-[650px] ${className}`}>
      {/* iPhone mockup - light frame */}
      <div className="relative w-full h-full bg-[#e8e8e8] rounded-[48px] p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_10px_30px_-10px_rgba(0,0,0,0.1)]">
        {/* Screen */}
        <div className="relative w-full h-full bg-[#f7f7f5] rounded-[40px] overflow-hidden">
          {/* Key fix: only mount the <video> when canPlay is true.
              Safari blocks autoplay on video elements that exist at opacity:0.
              By conditionally rendering, the video enters a fully-visible
              container and Safari allows autoPlay immediately. */}
          {video && canPlay ? (
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : screenshot ? (
            <img
              src={screenshot}
              alt={alt}
              width={300}
              height={630}
              fetchPriority={fetchPriority}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#d0d0cd] text-xs">
                Screen content
              </div>
            </div>
          )}
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[120px] w-[2.5px] h-[50px] bg-[#d4d4d4] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[182px] w-[2.5px] h-[50px] bg-[#d4d4d4] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[244px] w-[2.5px] h-[50px] bg-[#d4d4d4] rounded-l-sm" />
        <div className="absolute -right-[2px] top-[182px] w-[2.5px] h-[80px] bg-[#d4d4d4] rounded-r-sm" />
      </div>

    </div>
  );
}

export function AppleWatchMockup({ className = "", screenshot, alt = "Watch screen" }: { className?: string; screenshot?: string; alt?: string }) {
  return (
    <div className={`relative w-[220px] h-[267px] ${className}`}>
      {/* Apple Watch mockup - light frame */}
      <div className="relative w-full h-full bg-[#e8e8e8] rounded-[38px] p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_10px_30px_-10px_rgba(0,0,0,0.1)] border-0">
        {/* Digital Crown and button */}
        <div className="absolute -right-[2px] top-[60px] w-[5px] h-[22px] bg-[#d4d4d4] rounded-r-md" />
        <div className="absolute -right-[2px] top-[92px] w-[3.5px] h-[18px] bg-[#d4d4d4] rounded-r-sm" />

        {/* Screen */}
        <div className="relative w-full h-full bg-[#f7f7f5] rounded-[34px] overflow-hidden border-0">
          {screenshot ? (
            <div className="w-full h-full flex items-center justify-center bg-[#f7f7f5]">
              <img
                src={screenshot}
                alt={alt}
                width={180}
                height={220}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#d0d0cd] text-[10px]">
                Watch face
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
