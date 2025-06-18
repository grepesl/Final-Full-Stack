import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <h1>Contact & Support</h1>
            <p>We’re always happy to hear from fellow anime fans!</p>

            <div className="contact-details">
                <div className="contact-card">
                    <h2>📧 Email</h2>
                    <p>support@animeforum.com</p>
                </div>

                <div className="contact-card">
                    <h2>💬 Discord</h2>
                    <p>Join our server: <a href="#" target="_blank" rel="noreferrer">discord.gg/NANI?!forum</a></p>
                </div>

                <div className="contact-card">
                    <h2>🌐Social media</h2>
                    <p>Facebook <a href="#">Help Center</a></p>
                    {/*<p><a href="#">Instagram Help Center</a></p>*/}
                </div>

                <div className="contact-card">
                    <h2>📍 Location</h2>
                    <p>Virtually based in Vilnius, Lithuania</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
