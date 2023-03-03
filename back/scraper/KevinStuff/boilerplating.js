/*  This boilerplating is for a single website and is designed to scrape 
    one or more components specifically for that site
*/ 

// imports
const fs = require('fs'); // file writer
const puppeteer = require('puppeteer');
const robotsParser = require('robots-parser');

var url = "insert url here"; 

function writeFile(data) {
  fs.writeFile ("data.json", JSON.stringify(data), function(err) {
      if (err) throw err;
      }
  );
}

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
  const robotsUrl = `${new URL(url).origin}/robots.txt`;
  const robotsTxt = await (await fetch(robotsUrl)).text();
  const robots = robotsParser(robotsUrl, robotsTxt);
  if (!robots.isAllowed(url, 'puppeteer')) {
    console.log(`Cannot scrape ${url}: robots.txt disallows crawling`);
    return false;
  }

  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  if (await isNoIndex(page)) {
    console.log(`Cannot scrape ${url}: page has noindex meta tag`);
    await browser.close();
    return false;
  }

  await page.goto(url, { waitUntil: 'networkidle2' });

  //const prices = await page.$$eval('div.detail-footerCost--reduced span', prices => prices.map(price => price.textContent));
  //const rentLink = await page.$$eval('div.detail-footerApply a.detail-footerApplyLink', rentLink => rentLink.map(link => link.href));








  

  var today = new Date();
  var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var json = {
    // prices: prices,
    // rent_link: rentLink,
    time : timestamp
  };

  writeFile(json);

  await browser.close();
}

scrapeHousingPrices();

