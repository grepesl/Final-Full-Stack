import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import bcrypt from 'bcryptjs';
import {getQuestionsById} from "../../services/questionService.js";
import {loginUser} from "../../services/authService.js";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

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
                const response = await loginUser(values.email, values.password);
                if (response.status === 200) {
                    // Saugoma į localStorage
                    localStorage.setItem('token', response.jwt);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    console.log('user logged in');
                    console.log(localStorage.getItem('user'));
                    // Nustatoma user globaliam kontekste
                    setUser(response.user);
                    setTimeout(() => navigate('/'), 1000);
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