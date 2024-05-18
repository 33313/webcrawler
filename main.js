import { argv } from "node:process"
import { getBodyFromURL } from "./crawl.js"

function main() {
    if (argv.length != 3) {
        console.error(`ERROR: Expected 1 argument, got: ${argv.length - 2}`)
        return
    }
    console.log(`LOG: Crawling @ "${argv[2]}"...`)
    getBodyFromURL(argv[2]).then(res => console.log(res))
}

main()
