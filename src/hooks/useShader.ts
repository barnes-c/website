import { useEffect, useState } from "react"

export function useShader(containerRef: React.RefObject<HTMLDivElement | null>, fallbackMs = 1500) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const check = () => {
            const el = containerRef.current
            if (!el) return false
            const canvas = el.querySelector("canvas")
            if (canvas && canvas.width > 0 && canvas.height > 0) {
                setIsLoaded(true)
                return true
            }
            return false
        }

        if (check()) return

        const intervalId = window.setInterval(() => {
            if (check()) window.clearInterval(intervalId)
        }, 100)

        const fallbackTimer = window.setTimeout(() => setIsLoaded(true), fallbackMs)

        return () => {
            window.clearInterval(intervalId)
            window.clearTimeout(fallbackTimer)
        }
    }, [containerRef, fallbackMs])

    return isLoaded
}
