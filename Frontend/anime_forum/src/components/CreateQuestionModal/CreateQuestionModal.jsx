import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreateQuestionModal.css";
import {useAuth} from "../../context/AuthContext.jsx";
import {createQuestion} from "../../services/questionService.js";

const CreateQuestionModal = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth()

    const initialValues = {
        title: "",
        content: "",
        tags: ""
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Name is required")
            .min(5, "Title too short"),
        content: Yup.string()
            .required("Content is mandatory")
            .min(10, "Too short a question"),
        tags: Yup.string()
            .required("Enter at least one tag")
    });

    const handleSubmit = async (values, {resetForm}) => {
        const response = await createQuestion(values);
        if (response.status === 200) {
            resetForm();
            setIsOpen(false);
            onClose(true)
        }
    };

    return (
        <div className="padding-button">
            {user ? (
                    <button className="create-question-button" onClick={() => setIsOpen(true)}>
                        ➕ Create a question
                    </button>
            ) : (
                ''
            )}
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Create a new question</h2>

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
                                        placeholder="Title"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="title" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <Field
                                        as="textarea"
                                        name="content"
                                        placeholder="Question content..."
                                        className="form-textarea"
                                    />
                                    <ErrorMessage name="content" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="tags"
                                        placeholder="Tags (separated by commas)"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="tags" component="div" className="error" />
                                </div>

                                <div className="modal-buttons">
                                    <button type="submit" className="submit-button">Submit</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
                                        Cancel
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