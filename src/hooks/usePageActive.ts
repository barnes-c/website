import { useEffect, useState } from "react";

export function usePageActive() {
    const [active, setActive] = useState(!document.hidden);
    useEffect(() => {
        const onVis = () => { setActive(!document.hidden) };
        document.addEventListener("visibilitychange", onVis);
        return () => { document.removeEventListener("visibilitychange", onVis) };
    }, []);
    return active;
}