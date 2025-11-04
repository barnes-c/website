"use client"

import { useHorizontalSections } from "@/hooks/useHorizontalSections"
import { type ReactNode, Children, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react"

export type SectionsScrollerHandle = {
    scrollToSection: (index: number) => void
    getCurrentSection: () => number
}

type Props = {
    children: ReactNode
    onSectionChange?: (index: number) => void
}

const SectionsScroller = forwardRef<SectionsScrollerHandle, Props>(function SectionsScroller(
    { children, onSectionChange },
    ref
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionCount = useMemo(() => Children.count(children), [children])

    const { currentSection, scrollToSection } = useHorizontalSections(containerRef, { sectionCount })

    useEffect(() => {
        onSectionChange?.(currentSection)
    }, [currentSection, onSectionChange])

    useImperativeHandle(ref, () => ({
        scrollToSection,
        getCurrentSection: () => currentSection,
    }), [scrollToSection, currentSection])

    return (
        <div
            ref={containerRef}
            data-scroll-container
            className="relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 opacity-100"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {children}

            <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    )
})

export default SectionsScroller
