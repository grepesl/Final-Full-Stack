import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreateQuestionModal.css";
import {useAuth} from "../../context/AuthContext.jsx";
import {createQuestion} from "../../services/questionService.js";

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

    // TODO perkraut sukurus klausima

    const handleSubmit = async (values, {resetForm}) => {
        // const response = await safeRequest(
        //     `/questions`,
        //     'POST',
        //     values,
        //     'Atsakymas pridetas!',
        //     true
        // );
        //
        // if (response.status === 200) {
        //     resetForm();
        //     setIsOpen(false);
        // }

        const response = await createQuestion(values);
        if (response.status === 200) {
            resetForm();
            setIsOpen(false);
        }
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
