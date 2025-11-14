export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
            },
            {
                userAgent: 'DuckDuckBot',
                allow: '/',
            },
            {
                userAgent: 'Applebot',
                allow: '/',
            },
            {
                userAgent: 'Yandex',
                allow: '/',
            },
            // block AI and scrapers
            {
                userAgent: '*',
                disallow: '/',
            },
        ],
        sitemap: 'https://barnes.biz/sitemap.xml',
    }
}
