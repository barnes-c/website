"use client"

import { MagneticButton } from "@/components/magnetic-button"

type Props = {
    currentSection: number
    onNavigate: (index: number) => void
    brand?: { label: string; initial: string }
    items?: string[]
    loaded?: boolean
}

export function TopNav({
    currentSection,
    onNavigate,
    brand = { label: "Barnes", initial: "B" },
    items = ["Home", "Work", "Skills", "About", "Contact"],
    loaded = true,
}: Props) {
    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${loaded ? "opacity-100" : "opacity-0"
                }`}
        >
            <button onClick={() => onNavigate(0)} className="flex items-center gap-2 transition-transform hover:scale-105">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
                    <span className="font-sans text-xl font-bold text-foreground">{brand.initial}</span>
                </div>
                <span className="font-sans text-xl font-semibold tracking-tight text-foreground">{brand.label}</span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
                {items.map((item, index) => (
                    <button
                        key={item}
                        onClick={() => onNavigate(index)}
                        className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                            }`}
                    >
                        {item}
                        <span
                            className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                                }`}
                        />
                    </button>
                ))}
            </div>

            <MagneticButton variant="secondary" onClick={() => onNavigate(items.length - 1)}>
                Login
            </MagneticButton>
        </nav>
    )
}
