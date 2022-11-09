import "./MyListings"
import MyListings from "./MyListings"

const listing = {
    complexName: "Parkwest",
    address: "503 George Bush Dr W, College Station, TX 77840",
    price: 950,
    numBedrooms: 4,
    squareFt: 970,
    available: true,
    images: ["https://medialibrarycf.entrata.com/11529/MLv3/3/27/2022/2/24/8633/6022c10a28cfd3.92216126608.jpg", 
    "https://medialibrarycf.entrata.com/11529/MLv3/3/27/2022/2/24/8635/6022c155b48c77.14290236836.jpg",
    "https://medialibrarycf.entrata.com/11529/MLv3/3/27/2022/2/24/8640/6022c21d8058a5.75493197881.jpg",
    "https://medialibrarycf.entrata.com/11529/MLv3/3/27/2022/2/24/8643/6022c2615bf5f7.97975778311.jpg",
    "https://medialibrarycf.entrata.com/11529/MLv3/3/27/2022/2/24/8666/602d424a0f01f9.01953041961.jpg"],
    perks: ['Surface Parking', "Fully Furnished", "Bicycle Racks", "Study Rooms", "TV Lounges",
     "Full Kitches", "Stainless Steel Appliances", "Coffee Shop", "Full-Sized Beds"],
    rentURL: "https://www.parkwestlife.com/",
}

MyListings(listing);