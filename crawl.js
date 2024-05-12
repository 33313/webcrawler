function normalizeURL(url) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

export { normalizeURL }
