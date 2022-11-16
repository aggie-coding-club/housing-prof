// imports
var fs = require('fs'); // file writer
const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');
var robotsParser = require('robots-parser'); 

// start run crawler
var urls = []; // url of each housing site

/*******************************************TBI*********************************************/

// keywords will have to be written from file
var keywords = [];

/* attempt to read in keywords here, need to learn how to read in text from files

var r = readline.createInterface({
    input : fs.createReadStream('keywords.txt')
});

r.on('line', function (text) {
    keywords.push(text);
});

r = readline.createInterface({
    input : fs.createReadStream('urls.txt')
});

r.on('line', function (text) {
    urls.push(text);
});

*/

/*******************************************TBI*********************************************/

//r.on('close', function() { // still need to figure out how to properly read in text files, may not work, immediately after finishes reading file
    //urls.forEach(url => {
    //    fetchData(url, keywords); 
    //});
//});

let root = "https://www.vintageatcollegestation.com/floor-plans/";
fetchData("https://www.vintageatcollegestation.com/floor-plans/", keywords);

async function fetchData(url, keywords) {
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    if(response.status < 200 || response.status >= 300){
        console.log("Error occurred while fetching data");
        return;
    }
    
    // check noIndex and robots.txt so you don't get blocked
    var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
    var robots = robotsParser(root+'robots.txt');
    if (robots.isDisallowed(url)) {
        return;
    }

    // start scrape here

    // load html data for site
    const html = response.data;
    const $ = cheerio.load(html); 

    /*******************************************TBI*********************************************/

    // price section

    // address section

    // availability section

    // bedrooms section

    // pictures section

    // perks (optional) section

    // rent url section

    /*******************************************TBI*********************************************/




    // noIndex
    if ($.html().includes(noIndex)) { // breaks from the function and does not get anything if the html has a noIndex header
        return;
    }

    // timestamp for when the data was retrieved
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();




    /*******************************************TBI*********************************************/

    // writing json, you can format json like below 

    var json = { 
        /*
        price
        address
        availability
        bedrooms
        picture links
        perks (optional)
        rent urls
        time : timestamp
        */
    };

    writeFile(json);

    /*******************************************TBI*********************************************/

    // waits 1 second before scraping another site, used when you are scraping multiple sites
    await new Promise(r => setTimeout(r, 1000));
}

// JSON writing data to a file using fs, make sure to do JSON.stringify for any data
function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        }
    );
}
