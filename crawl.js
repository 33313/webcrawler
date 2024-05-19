import { JSDOM } from 'jsdom'

function normalizeURL(urlString) {
    const url = new URL(urlString)
    let path = `${url.host}${url.pathname}`
    return path.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

function getURLsFromHTML(htmlBody, baseURL) {
    const body = new JSDOM(htmlBody)
    let anchors = body.window.document.querySelectorAll('a')
    let links = []

    for (let a of anchors) {
        let str = a.href
        if (str.startsWith('/')) {
            if (String(baseURL).endsWith('/')) {
                str = `${String(baseURL).substring(0, String(baseURL).length - 1)}${a.href}`
            } else {
                str = `${baseURL}${a.href}`
            }
        }
        if (str.endsWith('/')) {
            str = str.substring(0, str.length - 1)
        }
        links.push(str)
    }

    return links
}

async function getBodyFromURL(url) {
    let res
    try {
        res = await fetch(url)
    } catch (e) {
        throw new Error(`Network error: ${e.message}`)
    }

    if (res.status > 299) {
        console.error(`ERROR: HTTP Request failed. Status code: ${res.status}`)
        return
    }
    const ct = res.headers.get("Content-Type")
    if (!ct || !ct.includes("text/html")) {
        console.error(`ERROR: Expected content type "text/html". Actual: ${ct}`)
        return
    }
    return await res.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const bURL = new URL(baseURL)
    const cURL = new URL(currentURL)
    if (bURL.hostname !== cURL.hostname) return pages

    const nCurrentURL = normalizeURL(currentURL)
    if (nCurrentURL in pages) {
        ++pages[nCurrentURL]
        return pages
    }

    pages[nCurrentURL] = 1

    console.log(`Crawling @ "${currentURL}"...`)
    let nextURLs
    try {
        let res = await getBodyFromURL(currentURL)
        nextURLs = getURLsFromHTML(res, baseURL)
    } catch (e) {
        console.error(`ERROR: ${e.message}`)
        return pages
    }

    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
}

export { normalizeURL, getURLsFromHTML, getBodyFromURL, crawlPage }
