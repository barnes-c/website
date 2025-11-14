import type { Skill } from "@/utils/types/skill"

export default function SkillsCard({
    skill,
    index,
    isVisible,
}: {
    skill: Skill
    index: number
    isVisible: boolean
}) {
    const getRevealClass = () => {
        if (!isVisible) {
            switch (skill.direction) {
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
            <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{skill.title}</h3>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{skill.description}</p>
        </div>
    )
}
