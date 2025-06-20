import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreateQuestionModal.css";
import {toast} from "react-toastify";
import {useAuth} from "../../context/AuthContext.jsx";
import {NavLink} from "react-router-dom";

const CreateQuestionModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth()

    const initialValues = {
        title: "",
        content: "",
        tags: ""
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Pavadinimas privalomas")
            .min(5, "Per trumpas pavadinimas"),
        content: Yup.string()
            .required("Turinys privalomas")
            .min(10, "Per trumpas klausimas"),
        tags: Yup.string()
            .required("Įveskite bent vieną tag'ą")
    });

    // const handleSubmit = (values, { resetForm }) => {
    //     console.log("Formos duomenys:", values);
    //     resetForm();
    //     setIsOpen(false);
    // };

    const handleSubmit = async (values, {resetForm}) => {

        console.log("Naujas atsakymas:", values.content);
        try {
            console.log(values);

            const res = await fetch('http://localhost:3000/questions/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: values.title,
                    content: values.content,
                    tags: values.tags,
                    user_uuid: user.uuid
                }),
            });

            console.log(res);

            const data = await res.json();

            console.log(data);

            if (data.status === 'OK') {
                // toast.success("Registracija sėkminga!");
                // setTimeout(() => navigate('/login'), 1000);

                // onClose(true)
                resetForm();
                setIsOpen(false);
            } else {
                // toast.error("Registration failed - " + data.message);

                // onClose(false)
            }

        } catch (error) {
            console.error('Fetch klaida:', error);
            toast.error('Įvyko tinklo klaida');
        }
        // toast.success("Atsakymas atnaujintas!");
        // onClose(isSuccess); // Uždaro modalą
    };

    return (
        <div className="padding-button">

            {user ? (
                <>
                    <button className="create-question-button" onClick={() => setIsOpen(true)}>
                        ➕ Sukurti klausimą
                    </button>
                </>
            ) : (
                ''
            )}

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Sukurti naują klausimą</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Pavadinimas"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="title" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <Field
                                        as="textarea"
                                        name="content"
                                        placeholder="Klausimo turinys..."
                                        className="form-textarea"
                                    />
                                    <ErrorMessage name="content" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="tags"
                                        placeholder="Temos / tag'ai (atskirti kableliais)"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="tags" component="div" className="error" />
                                </div>

                                <div className="modal-buttons">
                                    <button type="submit" className="submit-button">Pateikti</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
                                        Atšaukti
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateQuestionModal;
