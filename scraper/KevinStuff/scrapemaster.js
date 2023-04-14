/*  This boilerplating is for a single website and is designed to scrape 
    one or more components specifically for that site

    Co-written by Chat-GPT
*/ 

// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

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

var url = "https://revstudentliving.com/floor-plans/"; 

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

    // var floorPlans = await page.$$('.leaseleads-floor-plan-card');

    // // console.log(await floorPlans[0].evaluate(node => node.innerHTML));

    // const twelveNorthJson = [{site: "12 North"}];
    // const twelveNorthFloorPlans = []
    // for (const floorPlan of floorPlans) {

    //     const title = await floorPlan.$eval('.leaseleads-floor-plan-card__title', title => title.textContent);
    //     const price = await floorPlan.$eval('.leaseleads-floor-plan-card__details--large > li > span', price =>price.textContent);

    //     const details = await floorPlan.$$('.leaseleads-floor-plan-card__details > li');
    //     const bed = await details[0].evaluate(node => node.textContent);
    //     const bath = await details[1].evaluate(node => node.textContent);
    //     const sqft = await details[2].evaluate(node => node.textContent);

    //     const image = await floorPlan.$eval('.leaseleads-floor-plan-card__image > picture > img', image => image.src);
    //     const rentLink = await getRentLinks(await floorPlan.$$('.leaseleads-floor-plan-card__buttons > a'));

    //     const floorPlanJson = {
    //         title : title,
    //         price : price,
    //         bed : bed,
    //         bath : bath,
    //         sqft : sqft,
    //         image : image,
    //         rentLink : rentLink
    //     };
    //     twelveNorthFloorPlans.push(floorPlanJson);
    // }

    // // Write json out to file, add elements as they are scraped
    // twelveNorthJson.push({floorPlans: twelveNorthFloorPlans});
    // const address = await page.$$eval('a', link => {
    //     return link.filter(link => {
    //         const linkText = link.textContent.toLowerCase();
    //         return linkText.includes("college station, tx");
    //     }).map(link => link.textContent);
    // });
    // twelveNorthJson.push({address : address[0]});
    // twelveNorthJson.push({time : getDate()});
    // writeFile(twelveNorthJson);











    // // The Stack

    // var floorPlans = await page.$$('.floorplan-block');
    
    // const rentLink = await getRentLinks(await page.$$('a'));

    // const siteJson = [{site: "The Stack"}];
    // const siteFloorPlans = [];
    // for (const floorPlan of floorPlans) {

    //     const title = await floorPlan.$eval('.floorplan-block-info-name', title => title.textContent);

    //     const details = await floorPlan.$$('.floorplan-block-info-table > table > tbody > tr');
    //     var bed = await details[0].$$('td');
    //     bed = await bed[1].evaluate(node =>node.textContent);
    //     var bath = await details[1].$$('td');
    //     bath = await bath[1].evaluate(node =>node.textContent);
    //     var sqft = await details[2].$$('td');
    //     sqft = await sqft[1].evaluate(node =>node.textContent);
    //     var price = await details[3].$$('td');
    //     price = await price[1].evaluate(node =>node.textContent);

    //     const image = await floorPlan.$eval('.floorplan-block-image > img', image => image.src);
    //     //const rentLink = await getRentLinks(await floorPlan.$$('.leaseleads-floor-plan-card__buttons > a'));

    //     const floorPlanJson = {
    //         title : title,
    //         price : price,
    //         bed : bed,
    //         bath : bath,
    //         sqft : sqft,
    //         image : image,
    //         rentLink : rentLink
    //     };
    //     siteFloorPlans.push(floorPlanJson);
    // }

    // // Write json out to file, add elements as they are scraped
    // siteJson.push({floorPlans: siteFloorPlans});
    // const address = await page.$$eval('a', link => {
    //     return link.filter(link => {
    //         const linkText = link.textContent.toLowerCase();
    //         return linkText.includes("college station, tx");
    //     }).map(link => link.textContent);
    // });
    // siteJson.push({address : address[0]});
    // siteJson.push({time : getDate()});
    // writeFile(siteJson);








    // // The Standard

    // var floorPlans = await page.$$('.fp-block');
    
    // // const rentLink = await getRentLinks(await page.$$('a'));

    // const siteJson = [{site: "The Standard"}];
    // const siteFloorPlans = [];
    // for (const floorPlan of floorPlans) {

    //     const title = await floorPlan.$eval('.fp-name', title => title.textContent);

    //     const bed = await floorPlan.$eval('.fp-beds', bed => bed.textContent);
    //     const bath = await floorPlan.$eval('.fp-baths', bath => bath.textContent);
    //     const sqft = await floorPlan.$eval('.fp-sqft', sqft => sqft.textContent);
    //     const price = await floorPlan.$eval('.fp-price', price => price.textContent);

    //     const image = await floorPlan.$$eval('.fp-image > img', image => image.src);
    //     const links = await floorPlan.$$eval('.fp-link > strong > a', links => links.map(link => link.href));
    //     const rentLink = links[1];

    //     const floorPlanJson = {
    //         title : title,
    //         price : price,
    //         bed : bed,
    //         bath : bath,
    //         sqft : sqft,
    //         image : image,
    //         rentLink : rentLink
    //     };
    //     siteFloorPlans.push(floorPlanJson);
    // }

    // // Write json out to file, add elements as they are scraped
    // siteJson.push({floorPlans: siteFloorPlans});
    // const address = await page.$$eval('.footer-block-content > p', texts => texts.map(text => text.textContent));
    // siteJson.push({address : address[2]+" "+address[3]});
    // siteJson.push({time : getDate()});
    // writeFile(siteJson);











    // Rev Student Living

    var floorPlans = await page.$$('.floorsec-inner');
    
    const rentLink = await getRentLinks(await page.$$('a'));

    const siteJson = [{site: "Rev Student Living"}];
    const siteFloorPlans = [];
    for (const floorPlan of floorPlans) {

        var title = await floorPlan.$eval('.map-img-title', title => title.textContent);
        title = title.split("\n")[1].trim();

        const bedBath = await floorPlan.$eval('.fp-bed-count', text => text.textContent);
        var bed;
        var bath;
        if (bedBath.includes("STUDIO")) {
            bed = "1 BED";
            bath = "1 BATH";
        }
        else {
            bed = bedBath.split(" / ")[0];
            bath = bedBath.split(" / ")[1];
        }

        //const sqft = await floorPlan.$eval('.sq-feet > .fp-col-text', sqft => sqft.textContent);
        const price = await floorPlan.$eval('.fp-price-sec', price => price.textContent);

        const image = await floorPlan.$$eval('.floor_plan_gallery_item__image > img', image => image.src);
        // const links = await floorPlan.$$eval('.fp-link > strong > a', links => links.map(link => link.href));
        // const rentLink = links[1];

        const floorPlanJson = {
            title : title,
            price : price,
            bed : bed,
            bath : bath,
            //sqft : sqft,
            image : image,
            rentLink : rentLink
        };
        siteFloorPlans.push(floorPlanJson);
    }

    // Write json out to file, add elements as they are scraped
    siteJson.push({floorPlans: siteFloorPlans});
    var address = await page.$eval('.footer-section-3', text => text.textContent);
    address = address.split("\t").filter(address => {
        return address.includes("College Station");
    });
    siteJson.push({address : address});
    siteJson.push({time : getDate()});
    writeFile(siteJson);










    await browser.close();
}

scrapeHousingPrices();

