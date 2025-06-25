import {safeRequest} from "./apiService.js";

export const updateUser = async (uuid, values) => {
    return await safeRequest(
        `/users/${uuid}`,
        'PUT',
        values,
        'Profile information updated!'
    );
};

export const getUserById = async (uuid) => {
    return await safeRequest(
        `/users/${uuid}`,
        'GET'
    );
};