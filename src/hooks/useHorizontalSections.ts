// hooks/useHorizontalSections.ts
import { useCallback, useEffect, useRef, useState } from "react"

type Options = {
    sectionCount: number
}

export function useHorizontalSections(
    containerRef: React.RefObject<HTMLDivElement | null>,
    opts: Options
) {
    const { sectionCount } = opts
    const [currentSection, setCurrentSection] = useState(0)

    // touch and throttle state
    const touchStartY = useRef(0)
    const touchStartX = useRef(0)
    const scrollThrottleRef = useRef<number | undefined>(undefined)

    const scrollToSection = useCallback(
        (index: number) => {
            const container = containerRef.current
            if (!container) return
            const clamped = Math.max(0, Math.min(sectionCount - 1, index))
            const sectionWidth = container.offsetWidth
            container.scrollTo({ left: sectionWidth * clamped, behavior: "smooth" })
            setCurrentSection(clamped)
        },
        [containerRef, sectionCount]
    )

    // touch
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY
            touchStartX.current = e.touches[0].clientX
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
                e.preventDefault()
            }
        }

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY
            const touchEndX = e.changedTouches[0].clientX
            const deltaY = touchStartY.current - touchEndY
            const deltaX = touchStartX.current - touchEndX

            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
                if (deltaY > 0 && currentSection < sectionCount - 1) {
                    scrollToSection(currentSection + 1)
                } else if (deltaY < 0 && currentSection > 0) {
                    scrollToSection(currentSection - 1)
                }
            }
        }

        container.addEventListener("touchstart", handleTouchStart, { passive: true })
        container.addEventListener("touchmove", handleTouchMove, { passive: false })
        container.addEventListener("touchend", handleTouchEnd, { passive: true })

        return () => {
            container.removeEventListener("touchstart", handleTouchStart)
            container.removeEventListener("touchmove", handleTouchMove)
            container.removeEventListener("touchend", handleTouchEnd)
        }
    }, [containerRef, currentSection, scrollToSection, sectionCount])

    // wheel
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault()
                container.scrollBy({ left: e.deltaY, behavior: "instant" as ScrollBehavior })
                const sectionWidth = container.offsetWidth
                const newSection = Math.round(container.scrollLeft / sectionWidth)
                if (newSection !== currentSection) setCurrentSection(newSection)
            }
        }

        container.addEventListener("wheel", handleWheel, { passive: false })
        return () => container.removeEventListener("wheel", handleWheel)
    }, [containerRef, currentSection])

    // scroll listener with rAF throttle
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            if (scrollThrottleRef.current) return
            scrollThrottleRef.current = requestAnimationFrame(() => {
                const sectionWidth = container.offsetWidth
                const scrollLeft = container.scrollLeft
                const newSection = Math.round(scrollLeft / sectionWidth)
                if (newSection !== currentSection && newSection >= 0 && newSection <= sectionCount - 1) {
                    setCurrentSection(newSection)
                }
                scrollThrottleRef.current = undefined
            })
        }

        container.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
            container.removeEventListener("scroll", handleScroll)
            if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current)
        }
    }, [containerRef, currentSection, sectionCount])

    return { currentSection, scrollToSection }
}
