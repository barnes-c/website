"use client"

import { BackgroundShader } from "@/components/background-shader"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import SectionsScroller, { type SectionsScrollerHandle } from "@/components/sections-scroller"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/sections/hero-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { WorkSection } from "@/components/sections/work-section"
import { TopNav } from "@/components/top-nav"
import { useRef, useState } from "react"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const scrollerRef = useRef<SectionsScrollerHandle>(null)

  const handleNavigate = (i: number) => {
    scrollerRef.current?.scrollToSection(i)
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />
      <BackgroundShader />

      <TopNav currentSection={currentSection} onNavigate={handleNavigate} loaded />

      <SectionsScroller ref={scrollerRef} onSectionChange={setCurrentSection}>
        <HeroSection
          firstLine="Christopher"
          secondLine="Barnes"
          tagline="Cloud Systems Engineer: I design, automate, and operate infrastructure with Kubernetes, Terraform, and a heavy dose of curiosity."
        />

        <WorkSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </SectionsScroller>
    </main>
  )
}
