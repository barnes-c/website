import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTHENTIK_URL =
    process.env.AUTHENTIK_URL ?? "http://authentik-server.authentik.svc.cluster.local"

const apiRateLimit = new Map<string, { count: number; resetAt: number }>()
const API_LIMIT = 20
const API_WINDOW_MS = 60 * 1000

setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of apiRateLimit) {
        if (now > entry.resetAt) apiRateLimit.delete(ip)
    }
}, API_WINDOW_MS)

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
    const xffAll = request.headers.get("x-forwarded-for")?.split(",") ?? []
    const ip = xffAll[xffAll.length - 1]?.trim() ?? "unknown"

    if (request.nextUrl.pathname.startsWith("/api/")) {
        if (!checkRateLimit(ip)) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 })
        }
        return NextResponse.next()
    }

    // build own url instead of taking it from raw request.url string which can be influenced by the client
    const originalUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}${request.nextUrl.pathname}${request.nextUrl.search}`

    const xffEntries = request.headers.get("x-forwarded-for")?.split(",") ?? []
    const trustedIp = xffEntries[xffEntries.length - 1]?.trim() ?? ""

    const res = await fetch(`${AUTHENTIK_URL}/outpost.goauthentik.io/auth/nginx`, {
        headers: {
            "X-Original-URL": originalUrl,
            "X-Forwarded-For": trustedIp,
            "X-Forwarded-Host": request.nextUrl.host,
            "X-Forwarded-Proto": "https",
        },
    })

    if (res.status !== 200) {
        const rd = encodeURIComponent(originalUrl)
        return NextResponse.redirect(
            new URL(`/outpost.goauthentik.io/start?rd=${rd}`, originalUrl),
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
