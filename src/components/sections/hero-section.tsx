"use client"

type Props = {
    firstLine: string
    secondLine: string
    tagline: string
    className?: string
    hintText?: string
}

export function HeroSection({
    firstLine,
    secondLine,
    tagline,
    className,
    hintText = "Scroll to explore",
}: Props) {
    return (
        <section
            className={`flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24 ${className ?? ""}`}
        >
            <div className="max-w-3xl">
                <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
                    <span className="text-balance">
                        {firstLine}
                        <br />
                        {secondLine}
                    </span>
                </h1>
                <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
                    <span className="text-pretty">{tagline}</span>
                </p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
                <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-foreground/80">{hintText}</p>
                    <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
                    </div>
                </div>
            </div>
        </section>
    )
}
