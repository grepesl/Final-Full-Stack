import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:3000';

export const apiRequest = async (
    endpoint, method = 'GET', body = null, isAuthRequired = true) => {

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    console.log(isAuthRequired);
    if (isAuthRequired){
        const token = localStorage.getItem('token');
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log(options);

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            throw new Error(data.message || 'Įvyko klaida');
        }

        return data;
    } catch (error) {
        console.error('API klaida:', error);
        throw error;
    }
};

export const safeRequest = async (endpoint, method, body = null, successMessage = null, isAuthRequired = true) => {
    try {
        const data = await apiRequest(endpoint, method, body);
        if (successMessage) toast.success(successMessage);
        return data;
    } catch (error) {
        toast.error(error.message || 'Serverio klaida');
        // throw error;
    }
};


// export const loginRequest = async (body) => {
//
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         }
//     };
//
//     if (body) {
//         options.body = JSON.stringify(body);
//     }
//
//     try {
//         const response = await fetch(`${BASE_URL}${endpoint}`, options);
//         const data = await response.json();
//
//         if (!response.ok) {
//             throw new Error(data.message || 'Įvyko klaida');
//         }
//
//         return data;
//     } catch (error) {
//         console.error('API klaida:', error);
//         throw error;
//     }
// };
