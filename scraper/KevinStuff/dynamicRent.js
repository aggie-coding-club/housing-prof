/*  This boilerplating is for a single website and is designed to scrape 
    one or more components specifically for that site
*/ 

// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "https://aspirecollegestation.prospectportal.com/college-station/aspire-college-station/student/"; 

// DON'T CHANGE
function writeFile(data) {
  fs.writeFile ("data.json", JSON.stringify(data, null, 2), function(err) {
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
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    // Parses noIndex, DO NOT TOUCH
    if (await isNoIndex(page)) {
        console.log(`Cannot scrape ${url}: page has noindex meta tag`);
        await browser.close();
        return false;
    }

    // opens page up
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Edit code here:

    const linkSet = new Set(); // prevents duplicates
    const links = await page.$$eval('a', links => {
        return links
            .filter(link => link.textContent.toLowerCase() === "apply now" || link.textContent.toLowerCase() === "apply today" || link.textContent.toLowerCase() === "apply online")
            .map(link => {
                if (link.href.at(0) == '/') {
                    return url+link.href.substring(1, link.href.length); // if the link starts with a backslash
                }
                return link.href;
            });
    }); // If there is a link

    links.forEach(link => { linkSet.add(link); });
    
    // const href = link.getAttribute('href');
    // return url.resolve(page.url(), href);

    // Get the timestamp of when it was scraped, DO NOT TOUCH
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // Write json out to file, add elements as they are scraped
    var json = {
        links: Array.from(linkSet),
        time : timestamp
    };

    writeFile(json);

    await browser.close();
}

scrapeHousingPrices();

