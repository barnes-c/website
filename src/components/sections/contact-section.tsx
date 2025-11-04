"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { Mail, MapPin } from "lucide-react"
import { useState, type FormEvent } from "react"

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/barnes-c" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/christopher-barnes-96965218a/" },
] as const

export function ContactSection() {
    const { ref, isVisible } = useReveal(0.3)
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            return
        }

        setIsSubmitting(true)

        // TODO: Simulate form submission (replace with actual API call later)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "" })

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
    }

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
                    <div className="flex flex-col justify-center">
                        <div
                            className={`mb-6 transition-all duration-700 md:mb-12 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
                        >
                            <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                                {"Let's"}
                                <br />
                                {"talk"}
                            </h2>
                            <p className="font-mono text-xs text-foreground/60 md:text-base">/ Get in touch</p>
                        </div>

                        <div className="space-y-4 md:space-y-8">
                            <a
                                href="mailto:contact@barnes.biz"
                                className={`group block transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}`}
                                style={{ transitionDelay: "200ms" }}
                            >
                                <div className="mb-1 flex items-center gap-2">
                                    <Mail className="h-3 w-3 text-foreground/60" />
                                    <span className="font-mono text-xs text-foreground/60">Email</span>
                                </div>
                                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                                    contact@barnes.biz
                                </p>
                            </a>

                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                                style={{ transitionDelay: "350ms" }}
                            >
                                <div className="mb-1 flex items-center gap-2">
                                    <MapPin className="h-3 w-3 text-foreground/60" />
                                    <span className="font-mono text-xs text-foreground/60">Location</span>
                                </div>
                                <p className="text-base text-foreground md:text-2xl">Geneva, Switzerland</p>
                            </div>

                            <div
                                className={`flex gap-2 pt-2 transition-all duration-700 md:pt-4 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                                style={{ transitionDelay: "500ms" }}
                            >
                                {SOCIALS.map(({ label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={label}
                                        className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side - Minimal form */}
                    <div className="flex flex-col justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 md:space-y-6"
                            autoComplete="on"
                        >
                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}
                                style={{ transitionDelay: "200ms" }}
                            >
                                <label
                                    htmlFor="contact-name"
                                    className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    autoComplete="name"
                                    inputMode="text"
                                    enterKeyHint="next"
                                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                                    placeholder="Your name"
                                />
                            </div>

                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}
                                style={{ transitionDelay: "350ms" }}
                            >
                                <label
                                    htmlFor="contact-email"
                                    className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                    inputMode="email"
                                    enterKeyHint="next"
                                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}
                                style={{ transitionDelay: "500ms" }}
                            >
                                <label
                                    htmlFor="contact-message"
                                    className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    autoComplete="off"
                                    enterKeyHint="send"
                                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                                    placeholder="I have this offer for you..."
                                />
                            </div>

                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                                style={{ transitionDelay: "650ms" }}
                            >
                                <MagneticButton
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full disabled:opacity-50"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </MagneticButton>

                                {submitSuccess && (
                                    <p className="mt-3 text-center font-mono text-sm text-foreground/80">
                                        Message sent successfully!
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
