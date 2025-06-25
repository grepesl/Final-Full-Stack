import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import {useNavigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { registerUser } from "../../services/authService.js";

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordRepeat: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, 'Name too short')
                .max(20, 'Nickname is too long')
                .required('Required field')
                .trim(),
            email: Yup.string()
                .email('Invalid email')
                .required('Required field')
                .trim(),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
                    'The password must contain at least 1 uppercase letter, at least 1 lowercase letter, a special character (@$!%*?&), at least 1 number, and be at least 8 characters long and at least 25 characters long'
                )
                .required('Required field')
                .trim(),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password')], 'The passwords must match')
                .trim()
                .required('Required field')
                .trim(),
            education: Yup.string()
                .optional(),
            dob: Yup.date()
                .optional()
        }),
        onSubmit: async (values) => {
            const response = await registerUser(values);
            if (response.status === 200) {
                setTimeout(() => navigate('/login'), 1000);
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