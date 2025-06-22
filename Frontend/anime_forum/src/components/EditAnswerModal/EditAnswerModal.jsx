import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './EditAnswerModal.css';
import {safeRequest} from "../../services/apiService.js";
import {deleteQuestion} from "../../services/questionService.js";
import {updateAnswer} from "../../services/answerService.js";

const EditAnswerModal = ({ answer, onClose }) => {
    if (!answer) return null;

    const validationSchema = Yup.object({
        content: Yup.string()
            .required('Atsakymo tekstas privalomas')
            .min(5, 'Tekstas per trumpas'),
    });

    const handleSubmit = async (values) => {

        const response = await updateAnswer(answer.uuid, values);
        if (response.status === 200) {
            onClose(true)
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Redaguoti atsakymą</h2>

                <Formik
                    initialValues={{ content: answer.content }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <label>
                            Atsakymo tekstas:
                            <Field as="textarea" name="content" className="form-textarea" />
                            <ErrorMessage name="content" component="div" className="error" />
                        </label>

                        <div className="modal-buttons">
                            <button type="button" onClick={onClose}>Atšaukti</button>
                            <button type="submit">Išsaugoti</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default EditAnswerModal;