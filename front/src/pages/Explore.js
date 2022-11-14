import Filters from "../components/Filters";
import Listing from "../components/Listing";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Explore.css";

export default function Explore() {    

    const listings = [
        {
            price: 600,
            beds: 4,
            proximity: 2.1,
            area: 1500,
            available: true,
            complex: "Park West",
            address: "503 George Bush Dr W",
            imageURL: "https://via.placeholder.com/150",
        },
        {
            price: 750,
            beds: 3,
            proximity: 1.2,
            area: 1750,
            available: false,
            complex: "The Republic",
            address: "123 Hullaballo Ave",
            imageURL: "https://via.placeholder.com/200x150",
        },
        {
            price: 450,
            beds: 1,
            proximity: 0.1,
            area: 600,
            available: true,
            complex: "Hart Hall",
            address: "24 RELLIS Way",
            imageURL: "https://via.placeholder.com/175x150",
        },
    ]

    const cards = listings.map(listing => 
        <div>
            <CustomLink to="/">{
                Listing(listing)}
            </CustomLink>
        </div>
    );
        

    return (
        <>
            <div className="explore-container">
                <div className="filters-container">
                    <Filters />
                </div>

                <div className="listings-container"> 
                    {cards}
                </div>
            </div>
        </>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <Link to={to} className={isActive ? "active" : ""} {...props}>
            {children}
        </Link>
    );
}
