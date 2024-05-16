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

export { normalizeURL, getURLsFromHTML }
