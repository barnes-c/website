// components/SectionsScroller.tsx
"use client"

import { useHorizontalSections } from "@/hooks/useHorizontalSections"
import { Children, createContext, type ReactNode, useContext, useEffect, useMemo, useRef } from "react"

type Props = {
    children: ReactNode
    onSectionChange?: (index: number) => void
}

type Ctx = { currentSection: number; scrollToSection: (i: number) => void }
const SectionsContext = createContext<Ctx | null>(null)

export function useSectionsControls(): Ctx {
    const ctx = useContext(SectionsContext)
    if (!ctx) throw new Error("Controls not available outside SectionsScroller")
    return ctx
}

export function SectionsScroller({ children, onSectionChange }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionCount = useMemo(() => Children.count(children), [children])

    const { currentSection, scrollToSection } = useHorizontalSections(containerRef, { sectionCount })

    useEffect(() => {
        onSectionChange?.(currentSection)
    }, [currentSection, onSectionChange])

    return (
        <div
            ref={containerRef}
            data-scroll-container
            className="relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 opacity-100"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            <SectionsContext.Provider value={{ currentSection, scrollToSection }}>
                {children}
            </SectionsContext.Provider>

            <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    )
}
