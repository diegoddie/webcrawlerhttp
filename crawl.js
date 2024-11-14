import { JSDOM } from 'jsdom'

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
