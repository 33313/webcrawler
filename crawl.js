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
            str = `${baseURL}${a.href}`
        }
        if (str.endsWith('/')) {
            str = str.substring(0, str.length - 1)
        }
        links.push(str)
    }
    return links
}

async function getBodyFromURL(currentURL) {
    let res
    try {
        res = await fetch(currentURL)
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

export { normalizeURL, getURLsFromHTML, getBodyFromURL }
