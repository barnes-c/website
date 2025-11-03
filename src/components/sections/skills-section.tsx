"use client"

import { useReveal } from "@/hooks/use-reveal"

export function SkillsSection() {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div
                    className={`mb-12 transition-all duration-700 md:mb-16 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                        }`}
                >
                    <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        Skills
                    </h2>
                    <p className="font-mono text-sm text-foreground/60 md:text-base">/ What I bring to the table</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
                    {[
                        {
                            title: "Cloud Infrastructure",
                            description: "Certified Kubernetes Administrator (CKA & CKAD): Operating and scaling cloud infrastructure with OpenStack and Kubernetes",
                            direction: "top",
                        },
                        {
                            title: "Infrastructure as Code",
                            description: "Terraform Associate Certified: Managing large-scale IaC across OpenStack and Kubernetes",
                            direction: "right",
                        },
                        {
                            title: "Monitoring & Reliability",
                            description: "Prometheus, Mimir, Loki, Fluent Bit, and Grafana: Designing full observability stacks for production systems",
                            direction: "left",
                        },
                        {
                            title: "Linux Systems Engineering",
                            description: "Linux administration, networking, bash, and performance tuning in production environments",
                            direction: "right",
                        },
                        {
                            title: "Scientific Writing & Documentation",
                            description: "Master’s in Computer Science: Writing technical papers, documentation, and research material at CERN",
                            direction: "bottom",
                        },
                        {
                            title: "Web Development",
                            description: "Designing and building responsive interfaces with React, Next.js, and modern frontend tooling (e.g. this website)",
                            direction: "bottom",
                        }
                    ].map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ServiceCard({
    service,
    index,
    isVisible,
}: {
    service: { title: string; description: string; direction: string }
    index: number
    isVisible: boolean
}) {
    const getRevealClass = () => {
        if (!isVisible) {
            switch (service.direction) {
                case "left":
                    return "-translate-x-16 opacity-0"
                case "right":
                    return "translate-x-16 opacity-0"
                case "top":
                    return "-translate-y-16 opacity-0"
                case "bottom":
                    return "translate-y-16 opacity-0"
                default:
                    return "translate-y-12 opacity-0"
            }
        }
        return "translate-x-0 translate-y-0 opacity-100"
    }

    return (
        <div
            className={`group transition-all duration-700 ${getRevealClass()}`}
            style={{
                transitionDelay: `${index * 150}ms`,
            }}
        >
            <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
                <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
            </div>
            <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
        </div>
    )
}
