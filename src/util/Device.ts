import { BREAKPOINT } from "./constants";

const DEVICE = {
    width: window.innerWidth,
    isMobile: window.innerWidth < BREAKPOINT
} as const;

export default DEVICE;