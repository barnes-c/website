import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTHENTIK_URL =
    process.env.AUTHENTIK_URL ?? "http://authentik-server.authentik.svc.cluster.local"

export async function middleware(request: NextRequest) {
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
    matcher: ["/dashboard/:path*"],
}
