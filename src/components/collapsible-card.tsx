"use client"

import { useEffect, useRef, useState } from "react"

export default function Collapsible({
    isOpen,
    children,
    id,
}: {
    isOpen: boolean
    children: React.ReactNode
    id: string
}) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        // Measure content height
        const next = isOpen ? el.scrollHeight : 0
        setHeight(next)
    }, [isOpen, children])

    // Re-measure on window resize for responsive content
    useEffect(() => {
        const handler = () => {
            if (!ref.current) return
            setHeight(isOpen ? ref.current.scrollHeight : 0)
        }
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [isOpen])

    return (
        <div
            id={id}
            ref={ref}
            style={{ height }}
            className="overflow-hidden transition-[height] duration-300 ease-in-out"
            aria-hidden={!isOpen}
        >
            <div className="pt-4 pb-2">{children}</div>
        </div>
    )
}
