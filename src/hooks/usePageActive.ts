import { useEffect, useState } from "react";

export function usePageActive() {
    const [active, setActive] = useState(true);

    useEffect(() => {
        const onVis = () => setActive(!document.hidden);
        onVis();
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    return active;
}