// imports
var fs = require('fs'); // file writer

var root = "http://www.the2818life.com/floor-plans"; 

const puppeteer = require('puppeteer');

async function scrapeHousingPrices() {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  await page.goto(root, { waitUntil: 'networkidle2' });

  const frame = await page.$("#website_1111144");
    
  if(frame){
      // Wait for h2 inside the iframe
      await frame.waitForSelector('head');
  }else{
       console.log("iFrame not found");
  }

  //const prices = await page.$$eval('span.amount', prices => prices.map(price => price.textContent));
  //const rentLink = await page.$$eval('div.detail-footerApply a.detail-footerApplyLink', rentLink => rentLink.map(link => link.href));
  //console.log(prices);
  //console.log(rentLink);

  await browser.close();
}

scrapeHousingPrices();

