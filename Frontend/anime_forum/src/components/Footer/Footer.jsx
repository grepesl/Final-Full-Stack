import React from 'react';
import './Footer.css';
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section description">
                    <p>Where anime fans ask, answer, and connect 🌸</p>
                </div>

                <div className="footer-section social-icons">
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#" ><i className="bi bi-instagram"></i></a>
                </div>

                <nav className="footer-section footer-nav-links">
                    <NavLink to='/' className="footer-link">Home</NavLink>
                    <NavLink to='/profile' className="footer-link">Profile</NavLink>
                    <NavLink to='/contact' className="footer-link">Contact</NavLink>
                </nav>

                <div className="footer-section copyright">
                    <p>© {new Date().getFullYear()} NANI?! Forum. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}
