import { useReveal } from "@/hooks/use-reveal"
import { skills } from "@/utils/data/skill"
import SkillsCard from "../skills-card"

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
                    {skills.map((skill, i) => (
                        <SkillsCard key={i} skill={skill} index={i} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    )
}
