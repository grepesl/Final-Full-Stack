import {safeRequest} from "./apiService.js";

export const loginUser = async (email, password) => {
    return await safeRequest(
        '/auth/login',
        'POST',
        { email, password },
        'Login successfully!'
    );
};

export const registerUser = async (values) => {
    return await safeRequest(
        '/auth/register',
        'POST',
        values,
        'Registration successful!'
    );
};