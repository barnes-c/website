"use client"

import CollapsibleCard from "@/components/collapsible-card"
import type { Project } from "@/utils/types/project"

export default function ProjectCard({
    project,
    index,
    isVisible,
    open,
    onToggle,
}: {
    project: Project
    index: number
    isVisible: boolean
    open: boolean
    onToggle: () => void
}) {
    const getRevealClass = () => {
        if (!isVisible) {
            return project.direction === "left"
                ? "-translate-x-16 opacity-0"
                : "translate-x-16 opacity-0"
        }
        return "translate-x-0 opacity-100"
    }

    const panelId = `project-panel-${project.number}`

    return (
        <div
            className={`border-b border-foreground/10 py-2 transition-all duration-700 hover:border-foreground/20 ${getRevealClass()}`}
            style={{
                transitionDelay: `${index * 150}ms`,
                marginLeft: index % 2 === 0 ? "0" : "auto",
                maxWidth: index % 2 === 0 ? "85%" : "90%",
            }}
        >
            <button
                type="button"
                onClick={onToggle}
                className="group flex w-full items-center justify-between py-4 focus:outline-none"
                aria-expanded={open}
                aria-controls={panelId}
            >
                <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
                        {project.number}
                    </span>
                    <div className="text-left">
                        <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                            {project.company}
                        </h3>
                        <p className="font-mono text-xs text-foreground/50 md:text-lg">
                            {project.title}
                        </p>
                        <p className="font-mono text-xs text-foreground/50 md:text-sm">
                            {project.technologies}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-foreground/30 md:text-sm">
                        {project.year}
                    </span>
                    {/* Inline SVG chevron */}
                    <svg
                        className={`h-5 w-5 flex-none transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                    </svg>
                </div>
            </button>

            <CollapsibleCard isOpen={open} id={panelId}>
                <ul className="space-y-2 pl-14 pr-2 md:pl:[5.5rem] md:pl-[5.5rem]">
                    {project.description.map((line, i) => (
                        <li
                            key={i}
                            className="relative pl-5 font-sans text-sm text-foreground/80 md:text-base"
                        >
                            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-foreground/40" />
                            {line}
                        </li>
                    ))}
                </ul>
            </CollapsibleCard>
        </div>
    )
}
