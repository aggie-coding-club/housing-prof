/*  This boilerplating is for a single website and is designed to scrape 
    one or more components specifically for that site

    Co-written by Chat-GPT
*/ 

// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "https://live12north.com/floor-plans/"; 

// DON'T CHANGE
function writeFile(data) {
  fs.writeFile ("data.json", JSON.stringify(data, null, "\t"), function(err) {
      if (err) throw err;
      }
  );
}

function getDate() {
    // Get the timestamp of when it was scraped, DO NOT TOUCH
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return timestamp;
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
    return await rentLinks[0].evaluate(node => node.href);
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

    // Get into the floor plans page

    // For each floor plan

        // For each room type

            // Get price data
            
            // Get rent link
            
            // Get image links

            // Get square feet

            // Get address

            // Get bedrooms


    // 12 North

    var floorPlans = await page.$$('.leaseleads-floor-plan-card');

    // console.log(await floorPlans[0].evaluate(node => node.innerHTML));

    const twelveNorthJson = [{site: "12 North"}];
    const twelveNorthFloorPlans = []
    for (const floorPlan of floorPlans) {

        const title = await floorPlan.$eval('.leaseleads-floor-plan-card__title', title => title.textContent);
        const price = await floorPlan.$eval('.leaseleads-floor-plan-card__details--large > li > span', price =>price.textContent);
        const image = await floorPlan.$eval('.leaseleads-floor-plan-card__image > picture > img', image => image.src);
        const rentLink = await getRentLinks(await floorPlan.$$('.leaseleads-floor-plan-card__buttons > a'));

        const floorPlanJson = {
            title: title,
            price: price,
            image : image,
            rentLink : rentLink
        };
        twelveNorthFloorPlans.push(floorPlanJson);
    }

    // Write json out to file, add elements as they are scraped
    twelveNorthJson.push({floorPlans: twelveNorthFloorPlans});
    twelveNorthJson.push({time : getDate()});
    writeFile(twelveNorthJson);

    await browser.close();
}

scrapeHousingPrices();

