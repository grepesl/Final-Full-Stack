import { safeRequest } from "./apiService.js";

export const getQuestionsById = async (question_id) => {
    return await safeRequest(
        `/questions/${question_id}`,
        'GET',
        null,
        null,
        false);
};

export const getQuestions = async (params) => {
    return await safeRequest(
        `/questions?${params}`,
        'GET',
        null,
        null,
        false);
};

export const updateQuestion = async (uuid, values) => {
    return await safeRequest(
        `/questions/${uuid}`,
        'PUT',
        values,
        'Question updated!',
        true);
};

export const createQuestion = async (values) => {
    return await safeRequest(
        `/questions`,
        'POST',
        values,
        'Question created!',
        true);
};

export const deleteQuestion = async (uuid) => {
    return await safeRequest(
        `/questions/${uuid}`,
        'DELETE',
        null,
        'Question deleted!',
        true);
};