import { JSDOM } from 'jsdom'

export async function crawlPage(currentURL){
    console.log(`Crawling ${currentURL}`)

    // fetch the page
    try{
        const resp = await fetch(currentURL)
        if (resp.status > 399){
            console.log(`Error fetching ${currentURL}: ${resp.status}`)
            return
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Skipping ${currentURL} because content type is ${contentType}`)
            return
        }
        console.log(await resp.text())
    } catch (error) {
        console.log(`Error fetching ${currentURL}: ${error.message}`)
        return
    }
}

export function getURLSFromHTML(htmlBody, baseUrl) {
    const urls = []
    const domObj = new JSDOM(htmlBody)
    const linkElements = domObj.window.document.querySelectorAll('a')

    for (const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === "/") {
            // relative URL
            try{
                const urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {   
                console.log("error with relative URL: ", error.message)
            }
        } else {
            // absolute URL
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log("error with absolute URL: ", error.message)
            }
        }
    }
    
    return urls
}

export function normalizeUrl(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1)
    }

    return hostPath
}
