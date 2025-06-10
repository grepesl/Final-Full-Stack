import React from 'react'
import { NavLink } from "react-router-dom";

const LinkName = ({ to, label }) => {
    return (
        <div>
            <NavLink to={to} className="nav-link">
                <p>{label}</p>
                <hr className="nav-underline" />
            </NavLink>
        </div>
    )
}
export default LinkName
