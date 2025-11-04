"use client"

import type { ReactNode } from "react"
import { useLayoutEffect, useRef, useState } from "react"

export default function Collapsible({
    isOpen,
    id,
    children,
}: {
    isOpen: boolean
    id: string
    children: ReactNode
}) {
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [maxHeight, setMaxHeight] = useState<number>(0)

    useLayoutEffect(() => {
        const el = contentRef.current
        if (!el) return
        // eslint-disable-next-line
        setMaxHeight(isOpen ? el.scrollHeight : 0)
    }, [isOpen, children])

    useLayoutEffect(() => {
        const onResize = () => {
            const el = contentRef.current
            if (!el) return
            if (isOpen) setMaxHeight(el.scrollHeight)
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [isOpen])

    return (
        <div
            id={id}
            style={{ maxHeight, opacity: isOpen ? 1 : 0 }}
            className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
            aria-hidden={!isOpen}
        >
            <div ref={contentRef} className="pt-4 pb-2">
                {children}
            </div>
        </div>
    )
}
