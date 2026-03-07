import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 3
const WINDOW_MS = 60 * 60 * 1000

setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of rateLimit) {
        if (now > entry.resetAt) rateLimit.delete(ip)
    }
}, WINDOW_MS)

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const entry = rateLimit.get(ip)
    if (!entry || now > entry.resetAt) {
        rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS })
        return true
    }
    if (entry.count >= LIMIT) return false
    entry.count++
    return true
}

export async function POST(req: Request) {
    const xffEntries = req.headers.get("x-forwarded-for")?.split(",") ?? []
    const ip = xffEntries[xffEntries.length - 1]?.trim() ?? "unknown"
    if (!checkRateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    let body: unknown
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
    }

    const { name, email, message } = body as Record<string, unknown>

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
        return NextResponse.json({ error: "Fields too long" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const safeName = name.replace(/[\r\n]/g, " ")
    const safeEmail = email.replace(/[\r\n]/g, "")

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM ?? `"Website Contact" <${process.env.SMTP_USER}>`,
            to: "website@barnes.biz",
            replyTo: safeEmail,
            subject: `Contact form: ${safeName}`,
            text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${message}`,
        })
    } catch {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
}
