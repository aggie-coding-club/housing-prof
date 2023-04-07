// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "https://thestandardcollegestation.landmark-properties.com/floorplans/"; 

// DON'T CHANGE
function writeFile(data) {
  fs.writeFile ("data.json", JSON.stringify(data), function(err) {
      if (err) throw err;
      }
  );
}

// DON'T CHANGE
async function isNoIndex(page) {
    const metaTags = await page.$$('meta');
    for (const meta of metaTags) {
        const name = await meta.getProperty('name');
        const httpEquiv = await meta.getProperty('httpEquiv');
        const content = await meta.getProperty('content');
        const nameValue = await name.jsonValue();
        const httpEquivValue = await httpEquiv.jsonValue();
        const contentValue = await content.jsonValue();
        if (nameValue === 'robots' && contentValue === 'noindex') {
        return true;
        }
        if (httpEquivValue === 'X-Robots-Tag' && contentValue.includes('noindex')) {
        return true;
        }
    }
    return false;
}

async function getParents(elementHandles) {
    const allParents = []
    for (const elementHandle of elementHandles) {
        const parents = [];
        let currentElement = elementHandle;
        while (currentElement && (await currentElement.evaluate(node => node.tagName) != "BODY")) {
        const parentElement = await currentElement.getProperty('parentElement');
        if (!parentElement) {
            break;
        }
        parents.push(parentElement);
        currentElement = parentElement;
        }
        allParents.push(parents);
    }
    return allParents;
}

async function getRentLinks(allLinks) {
    const rentLinks = [];
    for (const link of allLinks) {
        const linkText = await link.evaluate(node => node.textContent.toLowerCase());
        const hasApplyNow = linkText.includes("lease now") || linkText.includes("apply");

        const hasChildApplyNow = await link.evaluate(node => {
            return Array.from(node.children).some(child => {
                const childLinkText = child.textContent.toLowerCase();
                return childLinkText.includes("lease now") || childLinkText.includes("apply");
            });
        }); // if it has a child
        if (hasApplyNow || hasChildApplyNow && link.href) {
            rentLinks.push(link);
        }
    }
    return rentLinks;
}

async function scrapeHousingPrices() {
    
    // Robots parsing, DO NOT TOUCH
    const robotsUrl = `${new URL(url).origin}/robots.txt`;
    const robotsTxt = await (await fetch(robotsUrl)).text();
    const robots = robotsParser(robotsUrl, robotsTxt);
    if (!robots.isAllowed(url, 'puppeteer')) {
        console.log(`Cannot scrape ${url}: robots.txt disallows crawling`);
        return false;
    }

    // Opens page
    const browser = await puppeteer.launch({headless : false}); // set headless to true to remove browser
    const page = await browser.newPage();

    // Parses noIndex, DO NOT TOUCH
    if (await isNoIndex(page)) {
        console.log(`Cannot scrape ${url}: page has noindex meta tag`);
        await browser.close();
        return false;
    }

    // opens page up
    await page.goto(url, { waitUntil: 'networkidle2' });

    const images = await page.$$eval('img', images => images.map(img => img.parentElement.innerHTML));

    const rentLinks = await getRentLinks(await page.$$('a'));

            // .map(link => {
            //     if (link.href.at(0) == '/') {
            //         return url+link.href.substring(1, link.href.length); // if the link starts with a backslash
            //     }
            //     return link;
            // });
    
    console.log("\n\n");
    //console.log(images[4]);

    const rentLinkParents = await getParents(rentLinks);

    
    
    
    // Get the timestamp of when it was scraped, DO NOT TOUCH
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // Write json out to file, add elements as they are scraped
    var json = {
        time : timestamp
    };

    writeFile(json);

    await browser.close();
}

scrapeHousingPrices();

