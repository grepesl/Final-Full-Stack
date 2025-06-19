import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './EditAnswerModal.css';

const EditAnswerModal = ({ answer, onClose }) => {
    if (!answer) return null;

    const validationSchema = Yup.object({
        content: Yup.string()
            .required('Atsakymo tekstas privalomas')
            .min(5, 'Tekstas per trumpas'),
    });

    const handleSubmit = async (values) => {
        console.log("Naujas atsakymas:", values.content);
        try {
            console.log(values);

            const res = await fetch('http://localhost:3000/answers/' + answer.uuid, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            console.log(res);

            const data = await res.json();

            console.log(data);

            if (data.status === 'OK') {
                // toast.success("Registracija sėkminga!");
                // setTimeout(() => navigate('/login'), 1000);

                onClose(true)
            } else {
                // toast.error("Registration failed - " + data.message);

                onClose(false)
            }

        } catch (error) {
            console.error('Fetch klaida:', error);
            toast.error('Įvyko tinklo klaida');
        }
        // toast.success("Atsakymas atnaujintas!");
        // onClose(isSuccess); // Uždaro modalą
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
