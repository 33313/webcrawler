import { test, expect } from "@jest/globals"
import { sortPages } from "./report.js"

test("Reports - sorting logic", () => {
    const pages = {
        "https://example.com": 2,
        "https://example.com/posts": 5,
        "https://example.com/posts/some_random_post": 71,
        "https://example.com/posts/really_popular_post": 284,
        "https://example.com/posts/boring_post": 9,
    }
    const pagesSorted = [
        ['https://example.com/posts/really_popular_post', 284],
        ['https://example.com/posts/some_random_post', 71],
        ['https://example.com/posts/boring_post', 9],
        ['https://example.com/posts', 5],
        ['https://example.com', 2]
    ]
    expect(sortPages(pages)).toStrictEqual(pagesSorted)
})
