import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Navbar.css";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title"><FaHome />Housing Prof</Link>
            <ul>
                <CustomLink to="/explore">Explore</CustomLink>
                <CustomLink to="/bookmarks">Bookmarks</CustomLink>
                <CustomLink to="/my-listings">My Listings</CustomLink>
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
