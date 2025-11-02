import { useEffect, useState } from "react";

export function useElementSize<T extends HTMLElement>() {
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [el, setEl] = useState<T | null>(null);

    useEffect(() => {
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { inlineSize: w, blockSize: h } =
                entry.contentBoxSize?.[0] ?? entry.contentRect;
            setSize({ w: Math.round(w), h: Math.round(h) });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [el]);

    return { ref: setEl, ...size };
}