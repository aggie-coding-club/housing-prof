import Filters from "../components/Filters";
import Listing from "../components/Listing"
import "./Explore.css";

export default function Explore() {    

    const listings = [
        {
            id: 0,
            price: 600,
            beds: 4,
            proximity: 2.1,
            area: 1500,
            available: true,
            complex: "Park West",
            address: "503 George Bush Dr W",
            imageURL: "www.parkwest.com",
        },
        {
            id: 1,
            price: 750,
            beds: 3,
            proximity: 1.2,
            area: 1750,
            available: false,
            complex: "The Republic",
            address: "123 Hullaballo Ave",
            imageURL: "www.republic.com",
        },
        {
            id: 2,
            price: 450,
            beds: 1,
            proximity: 0.1,
            area: 600,
            available: true,
            complex: "Hart Hall",
            address: "24 RELLIS Way",
            imageURL: "www.tamuhousing.com",
        },
    ]

    return (
        <>
            <div className="explore-container">
                <div className="filters-container">
                    <Filters />
                </div>

                <div className="listings-container"> 
                    <h1>Listings</h1>
                    <Listing />
                </div>
            </div>
        </>
    );
}
