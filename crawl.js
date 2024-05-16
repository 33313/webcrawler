function normalizeURL(urlString) {
    const url = new URL(urlString)
    let path = `${url.host}${url.pathname}`
    return path.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export { normalizeURL }
