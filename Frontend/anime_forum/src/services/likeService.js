import {safeRequest} from "./apiService.js";

export const getUserReaction = async (question_uuid) => {
    return await safeRequest(
        `/likes/${question_uuid}`,
        'GET',
        null,
        null
    );
};

export const addReaction = async (question_uuid, value) => {
    return await safeRequest(
        `/likes`,
        'POST',
        {
            question_uuid,
            value
        },
        null
    );
};