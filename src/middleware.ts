import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTHENTIK_URL =
    process.env.AUTHENTIK_URL ?? "http://authentik-server.authentik.svc.cluster.local"

const apiRateLimit = new Map<string, { count: number; resetAt: number }>()
const API_LIMIT = 20
const API_WINDOW_MS = 60 * 1000

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const entry = apiRateLimit.get(ip)
    if (!entry || now > entry.resetAt) {
        apiRateLimit.set(ip, { count: 1, resetAt: now + API_WINDOW_MS })
        return true
    }
    if (entry.count >= API_LIMIT) return false
    entry.count++
    return true
}

export async function middleware(request: NextRequest) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"

    if (request.nextUrl.pathname.startsWith("/api/")) {
        if (!checkRateLimit(ip)) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 })
        }
        return NextResponse.next()
    }

    const res = await fetch(`${AUTHENTIK_URL}/outpost.goauthentik.io/auth/nginx`, {
        headers: {
            "X-Original-URL": request.url,
            "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
            "X-Forwarded-Host": request.headers.get("host") ?? "",
            "X-Forwarded-Proto": "https",
        },
    })

    if (res.status !== 200) {
        const rd = encodeURIComponent(request.url)
        return NextResponse.redirect(
            new URL(`/outpost.goauthentik.io/start?rd=${rd}`, request.url),
        )
    }

    const next = NextResponse.next()
    const cookie = res.headers.get("set-cookie")
    if (cookie) next.headers.set("set-cookie", cookie)
    return next
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
}
