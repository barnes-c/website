import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
    const xffAll = request.headers.get("x-forwarded-for")?.split(",") ?? []
    const ip = xffAll[xffAll.length - 1]?.trim() ?? "unknown"

    if (!checkRateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/api/:path*"],
}
