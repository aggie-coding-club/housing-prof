/*  This file is an example of axios and cheerio scraping some html from Aspire College Station's leasing page
    For the imports you must run in the terminal:
    npm install axios
    npm install cheerio
    npm install robots-parser

    Also make sure you make a new file called .gitignore and put into the file node_modules exactly as typed so that
        github does not push a massive amount of files, but be sure to have node_modules locally.

    Do node example.js to run the code, and make sure you are cded into the same directory
*/

// imports
var fs = require('fs'); // file writer
const axios = require('axios');
const cheerio = require('cheerio');
var robotsParser = require('robots-parser'); // ignoring robots.txt and noIndex will block your crawler

// start run crawler

// root url of the site of the data you want, used in getting the robots.txt file and other links
var root = "https://aspirecollegestation.prospectportal.com/"; 

fetchData(root+"college-station/aspire-college-station/student"); // function calls root + leasing page as the url to scrape

async function fetchData(url) {
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    if(response.status < 200 || response.status >= 300){
        console.log("Error occurred while fetching data");
        return;
    }
    
    // check noIndex and robots.txt so you don't get blocked
    var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
    var robots = robotsParser(root+'robots.txt');
    if (robots.isDisallowed(url)) { // if robots does not allow the current site to be indexed, break from the function
        return;
    }

    /* Semi-scuffed explanation of how to scrape html data using cheerio:
    
        The $ variable should get the html data of all the elements by using $("element").html(), see example 1
        Getting the text requires you to use $("element").text(), see example 2
        You can access attributes by using $("element").attr("attribute")

        Check out the Cheerio selectors section for how to scrape different elements with different selectors here:
            https://zetcode.com/javascript/cheerio/

            Some useful ones are 
            $(".class") which gets all the elements with class name "class" and
            $("#id") which gets all the elements with id name "id", see example 3
            
            Also check out some useful functions such as .first() that only gets the first one of the specified element
            The $("element").find("innerElement") function finds the innerElement inside of the parent element, see example 4
    */

    // get html data






    const html = response.data; // response call gets data
    const $ = cheerio.load(html); // cheerio loads in the page
    
    var pageHtml = $.html(); // Example 1: gets the full html of the page, adding a ("element") after the $ gives the html of all the elements specified
    var titleName = $("title").text(); // Example 2: name of the title of the page
    var floorPlans1Wrapper = $("#floorplans-1"); // Example 3: gets the content of the element with id floorplans-1, the content of the 1 person bedrooms
    var a1Wrapper = floorPlans1Wrapper.find(".fp-col-text")[0]; // Example 4: uses find to get the first element with class fp-col-text inside floorPlans1
    var a1 = $(a1Wrapper).text(); // Gets the text of floor plan A1 after using the wrapper

    var imageWrapper = floorPlans1Wrapper.find(".image-link")[0]; // finds first image inside floorPlans1
    var imageLink = $(imageWrapper).find("img").attr("src"); // link to that image

    //console.log(pageHtml); // uncomment to see the full html of the page printed out
    console.log(titleName);
    console.log(a1);
    console.log(imageLink);






    // noIndex
    if ($.html().includes(noIndex)) { // breaks from the function and does not get anything if the html has a noIndex header
        return;
    }

    // timestamp for when the data was retrieved
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // writing json, you can format json like below
    var json = {
        title : titleName,
        //contents : pageHtml, // uncomment to write the full page to the data.json file
        floor : a1,
        image: imageLink,
        time : timestamp
    };



    

    writeFile(json);

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
