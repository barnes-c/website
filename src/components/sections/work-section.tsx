import ProjectCard from "@/components/project-card"
import { useReveal } from "@/hooks/use-reveal"
import { projects } from "@/utils/project"

export function WorkSection() {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div
                    className={`mb-12 transition-all duration-700 md:mb-16 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                        }`}
                >
                    <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        Featured
                    </h2>
                    <p className="font-mono text-sm text-foreground/60 md:text-base">/ Recent expirences</p>
                </div>

                <div className="space-y-6 md:space-y-8">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.number}
                            project={project}
                            index={i}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
