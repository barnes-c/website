"use client";
import { useElementSize } from "@/hooks/useElementSize";
import { usePageActive } from "@/hooks/usePageActive";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MeshGradient } from "@paper-design/shaders-react";

export default function BackgroundMesh() {
    const { ref, w, h } = useElementSize<HTMLDivElement>();
    const reduceMotion = usePrefersReducedMotion();
    const pageActive = usePageActive();

    const running = pageActive && !reduceMotion;
    const ready = w > 0 && h > 0;

    return (
        <div
            aria-hidden="true"
            ref={ref}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100dvh",
                zIndex: -1,
                pointerEvents: "none",
            }}
        >
            {ready && (
                <MeshGradient
                    width={w}
                    height={h}
                    colors={["#e0eaff", "#241d9a", "#f75092", "#9f50d3"]}
                    distortion={0.6}
                    swirl={0.1}
                    speed={running ? 0.08 : 0}
                    scale={1}
                    offsetX={-0.3}
                    fit="cover"
                    maxPixelCount={3_000_000}
                    minPixelRatio={1}
                />
            )}
        </div>
    );
}
