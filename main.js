import { crawlPage } from './crawl.js'

function main(){
    if (process.argv.length < 3) {
        console.log("No website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("Too many command line args")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    crawlPage(baseURL)
}

main()