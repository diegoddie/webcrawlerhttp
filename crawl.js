import { JSDOM } from 'jsdom'

export async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeUrl(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`Crawling ${currentURL}`)

    // fetch the page
    try{
        const resp = await fetch(currentURL)
        if (resp.status > 399){
            console.log(`Error fetching ${currentURL}: ${resp.status}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Skipping ${currentURL} because content type is ${contentType}`)
            return pages
        }
        
        const htmlBody = await resp.text()

        const nextURLS = getURLSFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLS){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

        return pages
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
