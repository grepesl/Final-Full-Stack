import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// TODO: pridet gimimo data, pakeist i formik sintakse

const Register = () => {
    const navigate = useNavigate();
    const notify = () => toast.success("Registracija sėkminga!");
    const notifyError = () => toast.error('Klaida registruojantis');


    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordRepeat: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Per trumpas vardas')
                .max(20, 'Slapyvardis per ilgas.')
                .required('Būtinas laukelis')
                .trim(),
            email: Yup.string()
                .email('Netinkamas el. paštas')
                .required('Būtinas laukelis')
                .trim(),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
                    'Slaptažodis privalo turėti bent 1 didžiąją, bent 1 mažąją raidę, specialų simbolį (@$!%*?&), bent 1 skaičių ir būtų ne trumpesnis nei 8 simbolių ir ne ilgesnis nei 25 simbolių.'
                )
                .required('Būtinas laukelis')
                .trim(),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password')], 'Slaptažodžiai turi sutapti.')
                .trim()
                .required('Laukas yra privalomas.')
                .trim(),
            education: Yup.string()
                .optional(),
            dob: Yup.date()
                .optional()
        }),
        onSubmit: async (values) => {
            try {
                console.log(values);

                const res = await fetch('http://localhost:3000/users', {
                    method: 'POST',
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
                    toast.success("Registracija sėkminga!");
                    setTimeout(() => navigate('/login'), 1000);
                } else {
                    toast.error("Registration failed - " + data.message);
                }

            } catch (error) {
                console.error('Fetch klaida:', error);
                toast.error('Įvyko tinklo klaida');
            }
        }
    });

    return (
        <div className="register-form-container">
            <ToastContainer />
            <h2 className="register-title">Registration</h2>
            <form onSubmit={formik.handleSubmit} className="register-form">
                <div className="register-field">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className={formik.errors.username && formik.touched.username ? 'invalid' : ''}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div className="register-error">{formik.errors.username}</div>
                    )}
                </div>

                <div className="register-field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={formik.errors.email && formik.touched.email ? 'invalid' : ''}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="register-error">{formik.errors.email}</div>
                    )}
                </div>

                <div className="register-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className={formik.errors.password && formik.touched.password ? 'invalid' : ''}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="register-error">{formik.errors.password}</div>
                    )}
                </div>
                <div className="register-field">
                    <label htmlFor="passwordRepeat">Repeat Password</label>
                    <input
                        id="passwordRepeat"
                        name="passwordRepeat"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordRepeat}
                        className={formik.errors.passwordRepeat && formik.touched.passwordRepeat ? 'invalid' : ''}
                    />
                    {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
                        <div className="register-error">{formik.errors.passwordRepeat}</div>
                    )}
                </div>

                <button type="submit" className="register-submit">Register</button>
            </form>
        </div>
    );
};

export default Register;

