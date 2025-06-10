import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import  LinkName  from '../LinkName/LinkName.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    const PhoneLinkName = ({ to, label }) => (
        <NavLink
            to={to}
            onClick={() => setVisible(false)}
            className="phone-nav-link"
        >
            {label}
        </NavLink>
    );

    return (
        <header className="navbar">
            <NavLink to={'/'}><img src={assets.logo} alt="Logo" className="navbar-logo" /></NavLink>

            <nav className="nav-links">
                <LinkName to="/" label="HOME" />
                <LinkName to="/contact" label="CONTACT" />
            </nav>

            <div className="nav-icons">
                <img src={assets.search_icon} alt="Search" className="icon" />

                <div className="profile-dropdown">
                    <img src={assets.profile_icon} alt="Profile" className="icon" />
                    <div className="dropdown-menu">
                        <NavLink to={'/login'}><p className="dropdown-item">Login</p></NavLink>
                        <NavLink to={'/register'}><p className="dropdown-item">Register</p></NavLink>
                    </div>
                    {/*<div className="dropdown-menu">*/}
                    {/*    <p className="dropdown-item">My Profile</p>*/}
                    {/*    <p className="dropdown-item">Orders</p>*/}
                    {/*    <p className="dropdown-item">Logout</p>*/}
                    {/*</div>*/}
                </div>

                <img
                    src={assets.menu_icon}
                    alt="Menu"
                    className="menu-icon"
                    onClick={() => setVisible(true)}
                />
            </div>

            {/*Sidebar menu for small screens*/}
            <aside className={`mobile-menu ${visible ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-back" onClick={() => setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="Back" className="back-icon" />
                        <p>Back</p>
                    </div>
                    <PhoneLinkName to="/" label="HOME" />
                    <PhoneLinkName to="/contact" label="CONTACT" />
                </div>
            </aside>
        </header>
    );
};

export default Navbar;
