// "One Timer. Every Device." — Cross-device sync showcase

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "../lib/gsap";

// ─── Device frame for each platform ──────────────────────────

type DeviceType = "iphone" | "ipad" | "mac" | "watch";

interface DeviceFrameProps {
  device: DeviceType;
  label: string;
  className?: string;
  screenshot?: string;
}

const DEVICE_STYLES: Record<
  DeviceType,
  { wrapper: string; screen: string; bezel: string }
> = {
  iphone: {
    wrapper: "w-[58px] sm:w-[130px] lg:w-[180px]",
    screen: "aspect-[9/19.5] rounded-[20px]",
    bezel: "p-[6px] rounded-[24px]",
  },
  ipad: {
    wrapper: "w-[72px] sm:w-[180px] lg:w-[260px]",
    screen: "aspect-[3/4] rounded-[12px]",
    bezel: "p-[6px] rounded-[16px]",
  },
  mac: {
    wrapper: "w-[92px] sm:w-[220px] lg:w-[320px]",
    screen: "aspect-[16/10] rounded-[6px]",
    bezel: "p-[6px] rounded-[10px] pb-[18px]",
  },
  watch: {
    wrapper: "w-[30px] sm:w-[70px] lg:w-[90px]",
    screen: "aspect-[5/6] rounded-[16px]",
    bezel: "p-[4px] rounded-[20px]",
  },
};

const TIMER_VALUE = "24:37";

function shouldForceMotionPreview() {
  if (typeof window === "undefined") {
    return false;
  }

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("force-motion") === "1";
}

function DeviceFrame({ device, label, className = "", screenshot }: DeviceFrameProps) {
  const styles = DEVICE_STYLES[device];
  const isSmall = device === "watch";

  return (
    <div className={`device-frame flex flex-col items-center gap-2 ${className}`}>
      <div className={styles.wrapper}>
        <div
          className={`${styles.bezel} bg-white border border-[#e0e0dd]`}
          style={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(26,158,148,0.1)",
          }}
        >
          <div
            className={`${styles.screen} bg-[#f7f7f5] overflow-hidden flex flex-col items-center justify-center gap-1`}
          >
            {screenshot ? (
              <img
                src={screenshot}
                alt={`${label} showing MinuteBank timer`}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <span
                  className={`${
                    isSmall ? "text-sm" : "text-xl sm:text-2xl"
                  } font-bold font-mono text-[#1a9e94]`}
                >
                  {TIMER_VALUE}
                </span>
                <span
                  className={`${
                    isSmall ? "text-[7px]" : "text-[9px]"
                  } tracking-[0.2em] uppercase text-[#888] font-medium`}
                >
                  focusing
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="text-[8px] sm:text-[12px] tracking-[0.12em] sm:tracking-widest uppercase text-[#71717a] font-medium">
        {label}
      </span>
    </div>
  );
}

// ─── Sync connector ──────────────────────────────────────

function SyncConnector({
  trackRef,
  lineRef,
  packetRef,
  packetGlowRef,
  anchorRefs,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
  lineRef: RefObject<SVGLineElement | null>;
  packetRef: RefObject<HTMLDivElement | null>;
  packetGlowRef: RefObject<HTMLDivElement | null>;
  anchorRefs: RefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <div
      className="sync-connector flex items-center justify-center w-full pointer-events-none"
      aria-hidden="true"
    >
      <div ref={trackRef} className="sync-track relative w-full max-w-[1080px] h-12">
        {/* Dashed base line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
          <svg width="100%" height="2" className="block overflow-visible">
            <line
              ref={lineRef}
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#1a9e94"
              strokeWidth="1.5"
              strokeDasharray="7 9"
              opacity="0.32"
            />
          </svg>
        </div>

        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            ref={(node) => {
              anchorRefs.current[index] = node;
            }}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a9e94]/40"
            style={{ left: 0, opacity: 0 }}
          />
        ))}

        <div
          ref={packetGlowRef}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 sm:w-4.5 sm:h-4.5 rounded-full bg-[#1a9e94]/18 blur-[6px]"
          style={{ left: 0, opacity: 0, visibility: "hidden" }}
        />
        <div
          ref={packetRef}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full bg-[#1a9e94] shadow-[0_0_8px_rgba(26,158,148,0.28)]"
          style={{ left: 0, opacity: 0, visibility: "hidden" }}
        />
      </div>
    </div>
  );
}

// ─── Pro badge ───────────────────────────────────────────────

function ProBadge() {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e87a55] text-white text-[10px] font-medium tracking-[3px] uppercase cta-glow">
      Pro
    </span>
  );
}

// ─── Main section ────────────────────────────────────────────

export default function PlatformSyncSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const packetGlowRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const forceMotion = shouldForceMotionPreview();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const packetElements = [packetGlowRef.current, packetRef.current].filter(Boolean) as HTMLDivElement[];

    // Keep the reduced-motion state visually clean. A static packet at the start of the line
    // reads like a broken animation, so we hide the packet unless motion is actually running.
    gsap.set(packetElements, { autoAlpha: 0 });

    function getAnchorPositions() {
      const trackElement = trackRef.current;

      if (!trackElement) {
        return [];
      }

      const trackRect = trackElement.getBoundingClientRect();
      const visibleFrames = gsap.utils.toArray<HTMLElement>(".devices-row .device-frame").filter((frame) => {
        return frame.offsetWidth > 0 && frame.offsetHeight > 0;
      });

      return visibleFrames.map((frame) => {
        const frameRect = frame.getBoundingClientRect();
        const frameCenter = frameRect.left + (frameRect.width / 2);
        return frameCenter - trackRect.left;
      });
    }

    function positionAnchors(anchorPositions: number[]) {
      const anchorElements = anchorRefs.current.filter(Boolean) as HTMLDivElement[];

      if (anchorElements.length === 0) {
        return;
      }

      gsap.set(anchorElements, {
        x: (index: number) => anchorPositions[index] ?? 0,
        xPercent: -50,
        autoAlpha: 0.24,
        scale: 1,
      });
    }

    function setLineExtents(anchorPositions: number[]) {
      if (!lineRef.current || anchorPositions.length < 2) {
        return;
      }

      lineRef.current.setAttribute("x1", `${anchorPositions[0]}`);
      lineRef.current.setAttribute("x2", `${anchorPositions[anchorPositions.length - 1]}`);
    }

    function pulseAnchor(anchorIndex: number, timeline: gsap.core.Timeline, atPosition?: string) {
      const anchorElement = anchorRefs.current[anchorIndex];

      if (!anchorElement) {
        return;
      }

      timeline.to(anchorElement, {
        autoAlpha: 0.72,
        scale: 1.5,
        duration: 0.12,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      }, atPosition);
    }

    function startPacketAnimation() {
      const anchorPositions = getAnchorPositions();
      const anchorElements = anchorRefs.current.filter(Boolean) as HTMLDivElement[];

      if (packetElements.length === 0 || anchorPositions.length < 4 || anchorElements.length < 4) {
        return;
      }

      positionAnchors(anchorPositions);
      setLineExtents(anchorPositions);

      const fullRoute = [
        anchorPositions[0],
        anchorPositions[1],
        anchorPositions[2],
        anchorPositions[3],
        anchorPositions[2],
        anchorPositions[1],
        anchorPositions[0],
      ];

      const packetTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.45,
      });

      gsap.set(packetElements, {
        x: anchorPositions[0],
        xPercent: -50,
        autoAlpha: 0,
        scale: 1,
      });

      pulseAnchor(0, packetTimeline);
      packetTimeline.to(packetElements, {
        autoAlpha: 1,
        duration: 0.16,
        ease: "power2.out",
      });

      for (let index = 1; index < fullRoute.length; index += 1) {
        const previousPosition = fullRoute[index - 1];
        const nextPosition = fullRoute[index];
        const distance = Math.abs(nextPosition - previousPosition);
        const duration = gsap.utils.clamp(0.28, 0.62, distance / 520);
        const anchorIndex = index <= 3 ? index : 6 - index;

        packetTimeline.to(packetElements, {
          x: nextPosition,
          duration,
          ease: "sine.inOut",
        });

        pulseAnchor(anchorIndex, packetTimeline, ">-0.10");
      }

      packetTimeline.to(packetElements, {
        autoAlpha: 0,
        duration: 0.18,
        ease: "power1.out",
      });

      if (lineRef.current) {
        gsap.set(lineRef.current, { strokeDashoffset: 0 });
        gsap.to(lineRef.current, {
          strokeDashoffset: -32,
          duration: 2.8,
          repeat: -1,
          ease: "none",
        });
      }

      const handleResize = () => {
        const nextAnchorPositions = getAnchorPositions();

        if (nextAnchorPositions.length < 4) {
          return;
        }

        positionAnchors(nextAnchorPositions);
        setLineExtents(nextAnchorPositions);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        packetTimeline.kill();
      };
    }

    // Desktop: keep the section readable and make the sync pulse obvious.
    mm.add("(min-width: 1024px)", () => {
      if (prefersReducedMotion && !forceMotion) {
        return;
      }

      const cleanups: Array<() => void> = [];

      gsap.from(".sync-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Keep the devices visible at all times. The sync packets are the moving part here;
      // hiding the screenshots until a trigger fires made the section feel broken.
      gsap.set(".device-frame", { autoAlpha: 1, y: 0, clearProps: "opacity,visibility,transform" });

      gsap.from(".sync-connector", {
        opacity: 0,
        y: 12,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sync-connector",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".sync-tagline", {
        opacity: 0,
        y: 15,
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sync-tagline",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      const packetCleanup = startPacketAnimation();
      if (packetCleanup) {
        cleanups.push(packetCleanup);
      }

      return () => {
        cleanups.forEach((cleanup) => {
          cleanup();
        });
      };
    });

    // Tablet + mobile: simple reveal, no connector lane.
    mm.add("(max-width: 1023px)", () => {
      if (prefersReducedMotion && !forceMotion) {
        return;
      }

      const cleanups: Array<() => void> = [];

      gsap.from(".sync-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.set(".device-frame", { autoAlpha: 1, y: 0, clearProps: "opacity,visibility,transform" });

      gsap.from(".sync-tagline", {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".sync-tagline",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      return () => {
        cleanups.forEach((cleanup) => {
          cleanup();
        });
      };
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="platforms"
      className="relative py-20 lg:py-28 bg-[#f7f7f5] scroll-mt-[60px]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="sync-header text-center mb-14 lg:mb-20">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <h2
              className="text-[26px] sm:text-[36px] lg:text-[40px] font-medium text-[#1a1a1a] leading-[1.1]"
              style={{ textWrap: "balance" }}
            >
              One Timer. All Devices.
            </h2>
            <ProBadge />
          </div>
          <p className="text-[#71717a] text-[16px] lg:text-[17px] leading-[1.7] max-w-2xl mx-auto">
            Start on your iPhone. Continue on your Mac. Check your Watch. All in perfect sync.
          </p>
        </div>

        {/* Device lineup */}
        <div className="devices-row">
          <div className="hidden lg:flex items-end justify-center gap-10">
            <DeviceFrame device="iphone" label="iPhone" />
            <DeviceFrame device="ipad" label="iPad" />
            <DeviceFrame device="mac" label="Mac" />
            <DeviceFrame device="watch" label="Watch" />
          </div>

          <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 justify-items-center">
            <DeviceFrame device="iphone" label="iPhone" />
            <DeviceFrame device="ipad" label="iPad" />
            <DeviceFrame device="mac" label="Mac" />
            <DeviceFrame device="watch" label="Watch" />
          </div>

          <div className="grid md:hidden grid-cols-4 gap-2 justify-items-center items-end">
            <DeviceFrame device="iphone" label="iPhone" />
            <DeviceFrame device="ipad" label="iPad" />
            <DeviceFrame device="mac" label="Mac" />
            <DeviceFrame device="watch" label="Watch" />
          </div>
        </div>

        <div className="-mt-1 sm:-mt-2 lg:-mt-4">
          <SyncConnector
            trackRef={trackRef}
            lineRef={lineRef}
            packetRef={packetRef}
            packetGlowRef={packetGlowRef}
            anchorRefs={anchorRefs}
          />
        </div>

        <p className="sync-tagline text-center text-[13px] text-[#888] mt-10 lg:mt-14 tracking-wide">
          Powered by real-time sync. No manual syncing. No delays.
        </p>
      </div>
    </section>
  );
}
