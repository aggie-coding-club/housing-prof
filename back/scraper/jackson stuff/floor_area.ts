import * as fs from "fs";
import * as cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";
import robotsParser from "robots-parser";

interface FloorPlan {
  title: string;
  name: string;
  price: number;
  available: boolean;
  bedrooms: number;
  floor_area: number;
  pictures_url: string[];
  perks: string[];
  rent_url: string;
  timestamp: string;
}

let root = "https://stackstudentliving.com";
let url = root + "/floor-plans";

async function fetchData(url: string) {
  let response = await axios.get(url);
  if (response.status < 200 || response.status >= 300 || !response) {
    console.log("Error occurred while fetching data");
    return;
  }

  let noIndex = '<meta name="robots" content="noindex"></meta>';
  let robots = robotsParser(root, "robots.txt");
  if (robots.isDisallowed(url)) {
    return;
  }

  const html: string = response.data;
  const $ = cheerio.load(html);

  if ($.html().includes(noIndex)) {
    console.log("noIndex found");
    return;
  }

  let today = new Date();
  let timestamp =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  let floorPlans: FloorPlan[] = [];

  // Search for the element that contains the text "sq. ft."
  let sqFeetWrapper = $(".sq-ft,.fp-sqft,tr").filter(function () {
    return $(this).text().includes("SQFT");
  });

  sqFeetWrapper = sqFeetWrapper.children().filter(function () {
    let regExpMatches: RegExpMatchArray | null = $(this).text().match(/^\d+$/);
    if (regExpMatches) {
      return regExpMatches.includes($(this).text());
    } else {
      return false;
    }
  });

  sqFeetWrapper.each((i, elem) => {
    // Loop through each element and extract the sq-feet number and add it to the floorPlans array
    let floorPlan: FloorPlan = {
      title: "",
      name: "",
      price: 0,
      available: false,
      bedrooms: 0,
      floor_area: 0,
      pictures_url: [],
      perks: [],
      rent_url: "",
      timestamp: timestamp,
    };

    let floor_area = $(elem).find(".fp-col-text").text() || $(elem).text();
    floorPlan.floor_area = Number(floor_area.replace(/[^0-9.-]+/g, ""));

    floorPlans.push(floorPlan);
  });

  for (let i = 0; i < floorPlans.length; i++) {
    console.log(floorPlans[i].floor_area + " sqft");
  }
}

fetchData(url);
