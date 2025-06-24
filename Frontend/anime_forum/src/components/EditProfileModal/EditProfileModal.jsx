import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './EditProfileModal.css';
import {updateUser} from "../../services/userService.js";
import {useAuth} from "../../context/AuthContext.jsx";

const EditProfileModal = ({ user, onClose }) => {

    const { updateAuthUser } = useAuth();

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(5, 'Vartotojo vardas per trumpas')
            .required('Privalomas laukas'),
        email: Yup.string()
            .email('Neteisingas el. pašto formatas')
            .required('Privalomas laukas'),
    });

    const handleSubmit = async (values) => {
        const response = await updateUser(user.uuid, values);
        if (response.status === 200) {
            onClose(true);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Redaguoti profilį</h3>

                <Formik
                    initialValues={{
                        username: user.username || '',
                        email: user.email || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <label>Username:</label>
                            <Field
                                type="text"
                                name="username"
                                className="modal-input"
                            />
                            <ErrorMessage name="username" component="div" className="error" />

                            <label>Email:</label>
                            <Field
                                type="email"
                                name="email"
                                className="modal-input"
                            />
                            <ErrorMessage name="email" component="div" className="error" />

                            <div className="modal-actions">
                                <button type="button" onClick={onClose}>Atšaukti</button>
                                <button type="submit">💾 Išsaugoti</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditProfileModal;
