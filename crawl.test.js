import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "./crawl"

test('URL normalization', () => {
    let urls = [
        "https://blog.boot.dev/path/",
        "https://blog.boot.dev/path",
        "http://blog.boot.dev/path/",
        "http://blog.boot.dev/path",
    ]
    for (let url of urls) {
        expect(normalizeURL(url)).toBe("blog.boot.dev/path")
    }
})

test('Get URLs from HTML', () => {
    const baseURL = "https://example.com"
    const html = `
    <html>
        <body>
            <a href="${baseURL}"><span>Home</span></a>
            <a href="/pictures"><span>Pictures</span></a>
            <a href="/posts"><span>Posts</span></a>
            <a href="${baseURL}/admin/panel"><span>Admin panel</span></a>
        </body>
    </html>
`
    const anchors = getURLsFromHTML(html, baseURL)
    const links = [
        baseURL,
        `${baseURL}/pictures`,
        `${baseURL}/posts`,
        `${baseURL}/admin/panel`
    ]
    for (let i = 0; i < anchors.length; i++) {
        expect(anchors[i]).toBe(links[i])
    }
})
