// GSAP setup — register plugins once, import this in main.tsx
// All components use useGSAP from @gsap/react for animations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Prevent iOS Safari address bar show/hide from triggering ScrollTrigger refresh
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
