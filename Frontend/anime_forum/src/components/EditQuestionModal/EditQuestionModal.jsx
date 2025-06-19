import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './EditQuestionModal.css';

const EditQuestionModal = ({ isOpen, onClose, question }) => {
    if (!isOpen || !question) return null;

    const validationSchema = Yup.object({
        title: Yup.string().required('Pavadinimas yra privalomas'),
        content: Yup.string().required('Turinys yra privalomas'),
        tags: Yup.string().required("Tag'ai yra privalomi"),
    });

    const handleSubmit = async (values) => {

        console.log("Naujas atsakymas:", values.content);
        try {
            console.log(values);

            const res = await fetch('http://localhost:3000/questions/' + question.uuid, {
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
                <h2>Redaguoti klausimą</h2>

                <Formik
                    initialValues={{
                        title: question.title,
                        content: question.content,
                        tags: question.tags,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <label>
                            Pavadinimas:
                            <Field type="text" name="title" className="form-input" />
                            <ErrorMessage name="title" component="div" className="error" />
                        </label>

                        <label>
                            Turinys:
                            <Field as="textarea" name="content" className="form-textarea" />
                            <ErrorMessage name="content" component="div" className="error" />
                        </label>

                        <label>
                            Tag'ai:
                            <Field type="text" name="tags" className="form-input" />
                            <ErrorMessage name="tags" component="div" className="error" />
                        </label>

                        <div className="modal-buttons">
                            <button type="button" onClick={onClose}>Atšaukti</button>
                            <button type="submit">Saugoti</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default EditQuestionModal;
