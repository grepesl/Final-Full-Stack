import { safeRequest } from "./apiService.js";

export const getAnswersByQuestion = async (question_uuid) => {
    return await safeRequest(
        `/answers?question_uuid=${question_uuid}`,
        'GET',
        null,
        null,
        false
    );
};

export const createAnswer = async (question_uuid, content) => {
    return await safeRequest(
        `/answers`,
        'POST',
        { question_uuid, content },
        'Answer successfully added!'
    );
};

export const updateAnswer = async (uuid, values) => {
    return await safeRequest(
        `/answers/${uuid}`,
        'PUT',
        values,
        'Answer updated!'
    );
};

export const deleteAnswer = async (uuid) => {
    return await safeRequest(
        `/answers/${uuid}`,
        'DELETE',
        null,
        'Reply deleted!'
    );
};