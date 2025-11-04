// app/page.tsx
"use client"

import { BackgroundShader } from "@/components/background-shader"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import SectionsScroller, { SectionsScrollerHandle } from "@/components/sections-scroller"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { WorkSection } from "@/components/sections/work-section"
import { TopNav } from "@/components/top-nav"
import React from "react"

export default function Home() {
  const [currentSection, setCurrentSection] = React.useState(0)
  const scrollerRef = React.useRef<SectionsScrollerHandle>(null)

  const handleNavigate = (i: number) => {
    scrollerRef.current?.scrollToSection(i)
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />
      <BackgroundShader />

      {/* Nav is OUTSIDE the scroller so it always follows the viewport */}
      <TopNav currentSection={currentSection} onNavigate={handleNavigate} loaded />

      <SectionsScroller ref={scrollerRef} onSectionChange={setCurrentSection}>
        {/* Hero */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                Christopher
                <br />
                Barnes
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Cloud Systems Engineer: I design, automate, and operate infrastructure with Kubernetes, Terraform, and a heavy dose of curiosity.
              </span>
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </SectionsScroller>
    </main>
  )
}
