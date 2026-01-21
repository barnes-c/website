"use client"

import { useShader } from "@/hooks/useShader"
import { useRef } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

type Props = {
    className?: string
}

export function BackgroundShader({ className }: Props) {
    const shaderContainerRef = useRef<HTMLDivElement>(null)
    const isLoaded = useShader(shaderContainerRef)

    return (
        <div
            ref={shaderContainerRef}
            className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
            style={{ contain: "strict" }}
        >
            <Shader className="h-full w-full">
                <Swirl
                    colorA="#1275d8"
                    colorB="#e19136"
                    speed={0.8}
                    detail={0.8}
                    blend={50}
                />
                <ChromaFlow
                    baseColor="#0066ff"
                    upColor="#0066ff"
                    downColor="#d1d1d1"
                    leftColor="#e19136"
                    rightColor="#e19136"
                    intensity={0.9}
                    radius={1.8}
                    momentum={25}
                    maskType="alpha"
                    opacity={0.97}
                />
            </Shader>
            <div className="absolute inset-0 bg-black/20" />
        </div>
    )
}
