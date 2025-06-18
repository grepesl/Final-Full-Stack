import React from 'react';
import './Profile.css';

const Profile = () => {
    const user = {
        username: "animeFan123",
        email: "animefan@example.com",
        joined: "2024-11-12",
        bio: "Labas! Mėgstu žiūrėti anime ir diskutuoti apie juos forume. 😊",
    };

    return (
        <div className="profile-container">
            <h2 className="profile-heading">👤 {user.username}</h2>

            <div className="profile-card">
                <div className="profile-avatar">🧑</div>

                <div className="profile-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {user.created_at}</p>
                </div>

                <button className="edit-button">✏️ Redaguoti</button>
            </div>
        </div>
    );
};

export default Profile;
