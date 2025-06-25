import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './EditAnswerModal.css';
import {updateAnswer} from "../../services/answerService.js";

const EditAnswerModal = ({ answer, onClose }) => {
    if (!answer) return null;

    const validationSchema = Yup.object({
        content: Yup.string()
            .required('Response text is required')
            .min(5, 'Text too short'),
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
                <h2>Edit answer</h2>

                <Formik
                    initialValues={{ content: answer.content }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <label>
                            Response text:
                            <Field as="textarea" name="content" className="form-textarea" />
                            <ErrorMessage name="content" component="div" className="error" />
                        </label>

                        <div className="modal-buttons">
                            <button type="button" onClick={onClose}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default EditAnswerModal;