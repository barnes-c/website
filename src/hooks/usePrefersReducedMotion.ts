import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
    const [reduce, setReduce] = useState(false);
    useEffect(() => {
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => { setReduce(m.matches satisfies boolean) };
        update();
        m.addEventListener("change", update);
        return () => { m.removeEventListener("change", update) };
    }, []);
    return reduce;
}
