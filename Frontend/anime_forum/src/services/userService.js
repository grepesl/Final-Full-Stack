import {safeRequest} from "./apiService.js";

export const updateUser = async (uuid, values) => {
    return await safeRequest(
        `/users/${uuid}`,
        'PUT',
        values,
        'Profilio informacija atnaujintas!'
    );
};

export const getUserById = async (uuid) => {
    return await safeRequest(
        `/users/${uuid}`,
        'GET'
    );
};