/*  This boilerplating is for a single website and is designed to scrape 
    one or more components specifically for that site
*/ 

// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "https://warehouseandfactory.com/floor-plans/"; 

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
    const browser = await puppeteer.launch({headless : true});
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
            .filter(link => {
                const linkText = link.textContent.toLowerCase();
                const hasApplyNow = linkText.includes('apply now') || linkText.includes('apply today') || linkText.includes("apply online") || linkText.includes("lease now") || linkText.includes("apply");

                const hasChildApplyNow = Array.from(link.children).some(child => {
                    const childLinkText = child.textContent.toLowerCase();
                    return childLinkText.includes('apply now') || childLinkText.includes('apply today') || childLinkText.includes("apply online") || linkText.includes("lease now") || linkText.includes("apply");
                }); // if link is in child

                return (hasApplyNow || hasChildApplyNow) && link.href;
            })
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

