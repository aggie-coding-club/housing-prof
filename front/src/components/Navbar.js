import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Housing Prof</Link>
            <ul>
                <CustomLink to="/zach">Zach</CustomLink>
                <CustomLink to="/john">John</CustomLink>
                <CustomLink to="/josh">Josh</CustomLink>
                <CustomLink to="/adnan">Adnan</CustomLink>
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
