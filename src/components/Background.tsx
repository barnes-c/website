import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useViewport } from "../hooks/useViewport";

function usePageActive() {
    const [active, setActive] = useState(!document.hidden);
    useEffect(() => {
        const onVis = () => { setActive(!document.hidden) };
        document.addEventListener("visibilitychange", onVis);
        return () => { document.removeEventListener("visibilitychange", onVis) };
    }, []);
    return active;
}

export default function BackgroundMesh() {
    const { w, h } = useViewport();
    const reduceMotion = usePrefersReducedMotion();
    const pageActive = usePageActive();

    const running = pageActive && !reduceMotion;
    const speed = running ? 0.2 : 0;

    const ready = w > 0 && h > 0;

    return (
        <div
            aria-hidden="true"
            style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
        >
            {ready && (
                <MeshGradient
                    width={Math.round(w)}
                    height={Math.round(h)}
                    colors={["#e0eaff", "#241d9a", "#f75092", "#9f50d3"]}
                    distortion={0.6}
                    swirl={0.1}
                    speed={speed}
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
