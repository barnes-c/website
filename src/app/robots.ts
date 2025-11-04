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
                userAgent: 'GPTBot',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                disallow: '/',
            },
            {
                userAgent: 'Anthropic-AI',
                disallow: '/',
            },
            {
                userAgent: 'FacebookBot',
                disallow: '/',
            },
            {
                userAgent: 'Twitterbot',
                disallow: '/',
            },
            {
                userAgent: '*',
                disallow: '/',
            },
        ],
        sitemap: 'https://barnes.biz/sitemap.xml',
    }
}
