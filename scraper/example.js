/*  This boilerplating is for a single website and is designed to scrape 
    one or more components specifically for that site
*/ 

// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "https://aspirecollegestation.prospectportal.com/college-station/aspire-college-station/student"; 

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

    const prices = await page.$$eval('.rent-price', prices => prices.map(price => price.textContent)); // Class
    const links = await page.$$eval('.primary-action.fp-availability.btn', links => links.map(link => link.href)); // Element with multiple classes
    const beds = await page.$$eval('.fp-col-text', beds => beds.map(bed => bed.textContent));
    const images = await page.$$eval('img', images => images.map(image => image.src)); // "img" is the name of the element, "img.class" would get the image's class
    const floorPlans = await page.$$eval('#floorplans-1', floorPlans => floorPlans.map(floorPlan => floorPlan.innerHTML)); // # gets the id

    // Get the timestamp of when it was scraped, DO NOT TOUCH
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // Write json out to file, add elements as they are scraped
    var json = {
        prices: prices,
        links: links,
        beds: beds,
        images: images,
        floorPlans: floorPlans,
        time : timestamp
    };

    writeFile(json);

    await browser.close();
}

scrapeHousingPrices();