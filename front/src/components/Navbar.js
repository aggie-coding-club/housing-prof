import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Navbar.css";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

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

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title"><FaHome />Housing Prof</Link>
            <ul>
                <CustomLink to="/explore">Explore</CustomLink>
                <CustomLink to="/bookmarks">Bookmarks</CustomLink>
                <CustomLink to="/my-listings" state={{listing: listing}}>Listing Page</CustomLink>
                <CustomLink to="/profile" id="profile"><CgProfile className="profile"/></CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li>
            <Link to={to} className={isActive ? "active" : ""} {...props}>
                {children}
            </Link>
        </li>
    );
}
