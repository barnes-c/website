import { useEffect, useState } from "react";

type Size = { w: number; h: number };

export function useViewport() {
    const [size, setSize] = useState<Size>({ w: 0, h: 0 });

    useEffect(() => {
        const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return size;
}
