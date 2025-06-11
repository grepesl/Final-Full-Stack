import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import bcrypt from 'bcryptjs';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('El. paštas privalomas'),
            password: Yup.string()
                .required('Slaptažodis privalomas'),
        }),
        onSubmit: async (values) => {
            try {
                console.log(values);

                //const hashedPassword = bcrypt.hashSync(values.password, 10);

                const res = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                });

                console.log(res);

                const data = await res.json();

                console.log(data);

                if (data.status === 'OK') {
                    toast.success("Login successfully");
                    setTimeout(() => navigate('/home'), 1000);
                } else {
                    toast.error("Login failed - " + data.message);
                }

            } catch (error) {
                console.error('Fetch klaida:', error);
                toast.error('Įvyko tinklo klaida');
            }
        }
    });

    return (
        <div className="login-form-container">
            <h2 className="login-form-title">Login</h2>
            <form onSubmit={formik.handleSubmit} className="login-form">
                <div className="login-form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={
                            formik.errors.email && formik.touched.email ? 'invalid' : ''
                        }
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="login-form-error">{formik.errors.email}</div>
                    )}
                </div>

                <div className="login-form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className={
                            formik.errors.password && formik.touched.password
                                ? 'invalid'
                                : ''
                        }
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="login-form-error">{formik.errors.password}</div>
                    )}
                </div>

                <button type="submit" className="login-form-submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;