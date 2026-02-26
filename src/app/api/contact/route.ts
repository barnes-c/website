import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    await transporter.sendMail({
        from: process.env.SMTP_FROM ?? `"Website Contact" <${process.env.SMTP_USER}>`,
        to: "website@barnes.biz",
        replyTo: email,
        subject: `Contact form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
}
