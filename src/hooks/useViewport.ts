import { useEffect, useState } from "react";

export function useViewport() {
    const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    useEffect(() => {
        function onResize() {
            setSize({ w: window.innerWidth, h: window.innerHeight });
        }
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => { window.removeEventListener("resize", onResize) };
    }, []);

    return size;
}
