import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from "../../context/AuthContext.jsx";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal.jsx";

import {getUserById } from "../../services/userService.js";

const Profile = () => {
    const { user, updateAuthUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onEditModalClose = async (isSuccess) => {
        if (isSuccess){
            const response = await getUserById(user.uuid);
            updateAuthUser(response.user);
        }
        setIsModalOpen(false);
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            {isModalOpen && (
                <EditProfileModal user={user} onClose={onEditModalClose} />
            )}
            <h2 className="profile-heading">👤 {user.username}</h2>
            <div className="profile-card">
                <div className="profile-avatar">🧑</div>

                <div className="profile-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {user.created_at.slice(0,10)}</p>
                </div>

                <button className="edit-button" onClick={() => setIsModalOpen(true)}>
                    EDIT
                </button>
            </div>
        </div>
    );
};

export default Profile;
