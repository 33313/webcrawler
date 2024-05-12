import { test, expect } from "@jest/globals"
import { normalizeURL } from "./crawl"


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
