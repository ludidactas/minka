import { cn } from "@/lib/utils"

interface WaveDividerProps {
    color?: string
    edge?: "top" | "bottom"
    className?: string
}

// Same curve reflected around y=100 (viewBox height) for each edge, so the shape is
// identical either way. The fill always reaches all the way to the edge it seals
// against (at every x, not just at the center) — swap which path goes with which
// edge and a transparent gap opens up near the left/right corners.
const WAVE_PATHS = {
    top: "M0 0L0 4C0 4 250 100 500 100C750 100 1000 4 1000 4L1000 0L0 0Z",
    bottom: "M0 100L0 96C0 96 250 0 500 0C750 0 1000 96 1000 96L1000 100L0 100Z",
}

/**
 * Mounted like shapedividers.com dividers: an absolutely-positioned, transparent
 * overlay glued to the edge of its `relative overflow-hidden` parent, overshooting
 * by -0.1vw on every side. That overshoot swallows the sub-pixel rounding gap that
 * otherwise shows up as a hairline seam when adjacent sections don't land on exact
 * pixel boundaries — and since the SVG itself has no background, it never needs to
 * match whatever color sits behind it.
 */
export function WaveDivider({ color = "#000", edge = "bottom", className }: WaveDividerProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className={cn(
                "pointer-events-none absolute left-[-0.1vw] right-[-0.1vw] block h-22.5 w-[calc(100%+0.2vw)] min-[2100px]:h-[calc(2vw+90px)]",
                edge === "top" ? "top-[-0.1vw]" : "bottom-[-0.1vw]",
                className
            )}
        >
            <path d={WAVE_PATHS[edge]} fill={color} />
        </svg>
    )
}
