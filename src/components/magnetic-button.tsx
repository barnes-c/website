"use client"

import type { ReactNode } from "react"
import {
    type ButtonHTMLAttributes,
    forwardRef,
    type MouseEvent,
    useEffect,
    useRef
} from "react"

type Variants = "primary" | "secondary" | "ghost"
type Sizes = "default" | "lg"

interface MagneticButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    variant?: Variants
    size?: Sizes
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
    (
        {
            children,
            className = "",
            variant = "primary",
            size = "default",
            onMouseMove,
            onMouseLeave,
            style,
            ...props
        },
        forwardedRef
    ) => {
        const localRef = useRef<HTMLButtonElement>(null)
        const rafRef = useRef<number | null>(null)
        const positionRef = useRef({ x: 0, y: 0 })

        useEffect(() => {
            if (!forwardedRef) return
            if (typeof forwardedRef === "function") {
                forwardedRef(localRef.current)
            } else {
                forwardedRef.current = localRef.current
            }
        }, [forwardedRef])

        useEffect(() => {
            return () => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current)
            }
        }, [])

        const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
            if (!localRef.current) {
                onMouseMove?.(e)
                return
            }

            const rect = localRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            positionRef.current = { x: x * 0.15, y: y * 0.15 }

            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => {
                if (localRef.current) {
                    localRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`
                }
            })

            onMouseMove?.(e)
        }

        const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
            positionRef.current = { x: 0, y: 0 }
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => {
                if (localRef.current) {
                    localRef.current.style.transform = "translate3d(0px, 0px, 0)"
                }
            })
            onMouseLeave?.(e)
        }

        const variants: Record<Variants, string> = {
            primary:
                "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]",
            secondary:
                "bg-foreground/5 text-foreground hover:bg-foreground/10 backdrop-blur-xl border border-foreground/10 hover:border-foreground/20",
            ghost:
                "bg-transparent text-foreground hover:bg-foreground/5 backdrop-blur-sm",
        }

        const sizes: Record<Sizes, string> = {
            default: "px-6 py-2.5 text-sm",
            lg: "px-8 py-3.5 text-base",
        }

        return (
            <button
                {...props}
                ref={localRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`
            relative overflow-hidden rounded-full font-medium
            transition-all duration-300 ease-out will-change-transform
            ${variants[variant]}
            ${sizes[size]}
            ${className}
          `}
                style={{
                    transform: "translate3d(0px, 0px, 0)",
                    contain: "layout style paint",
                    ...style,
                }}
            >
                <span className="relative z-10">{children}</span>
            </button>
        )
    }
)

MagneticButton.displayName = "MagneticButton"
