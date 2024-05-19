export function printReport(pages) {
    console.log("")
    console.log("---------------------- REPORT -----------------------")
    sortPages(pages).forEach(
        ([link, count]) => console.log(
            `- Found ${count} reference${count > 1 ? 's' : ''} to ${link}`
        )
    )
    console.log("------------------- END OF REPORT -------------------")
}

export function sortPages(pages) {
    return Object.entries(pages).sort(([, a], [, b]) => b - a)
}
