import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // Pridedame CSS failą

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    const LinkName = ({ to, label }) => (
        <NavLink to={to} className="nav-link">
            <p>{label}</p>
            <hr className="nav-underline" />
        </NavLink>
    );

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
            <img src={assets.logo} alt="Logo" className="navbar-logo" />

            <nav className="nav-links">
                <LinkName to="/" label="HOME" />
                <LinkName to="/shop" label="SHOP" />
                <LinkName to="/about" label="ABOUT" />
                <LinkName to="/contact" label="CONTACT" />
            </nav>

            <div className="nav-icons">
                <img src={assets.search_icon} alt="Search" className="icon" />

                <div className="profile-dropdown">
                    <img src={assets.profile_icon} alt="Profile" className="icon" />
                    <div className="dropdown-menu">
                        <p className="dropdown-item">My Profile</p>
                        <p className="dropdown-item">Orders</p>
                        <p className="dropdown-item">Logout</p>
                    </div>
                </div>

                <Link to="/cart" className="cart-icon">
                    <img src={assets.cart_icon} alt="Cart" className="icon" />
                    <span className="cart-count">10</span>
                </Link>

                <img
                    src={assets.menu_icon}
                    alt="Menu"
                    className="menu-icon"
                    onClick={() => setVisible(true)}
                />
            </div>

            <aside className={`mobile-menu ${visible ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-back" onClick={() => setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="Back" className="back-icon" />
                        <p>Back</p>
                    </div>
                    <PhoneLinkName to="/" label="HOME" />
                    <PhoneLinkName to="/shop" label="SHOP" />
                    <PhoneLinkName to="/about" label="ABOUT" />
                    <PhoneLinkName to="/contact" label="CONTACT" />
                </div>
            </aside>
        </header>
    );
};

export default Navbar;
