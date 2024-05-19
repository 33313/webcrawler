import { argv } from "node:process"
import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

function main() {
    if (argv.length != 3) {
        console.error(`ERROR: Expected 1 argument, got: ${argv.length - 2}`)
        return
    }
    console.log(`LOG: Crawling @ "${argv[2]}"...`)
    crawlPage(new URL(argv[2])).then(pages => printReport(pages))
}

main()
