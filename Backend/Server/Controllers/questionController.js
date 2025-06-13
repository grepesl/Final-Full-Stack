// controllers/userController.js
import database from './../database.js';

export const getQuestions = async (req, res) => {
    try {
        const data = await database.promise().query(
            `SELECT q.*,
                    u.username,
                    (SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) as answers_count,
                    5                                                           as likes_count
             FROM questions q
                      LEFT JOIN users u ON u.uuid = q.user_uuid `
        );
        res.status(200).json({
            questions: data[0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const getQuestionById = async (req, res) => {
    const { id } = req.params

    try {
        const data = await database.promise().query(
            `SELECT q.*,
                    u.username,
                    (SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) as answers_count,
                    5                                                           as likes_count
             FROM questions q
                      LEFT JOIN users u ON u.uuid = q.user_uuid 
              WHERE q.uuid = ?`,[id]
        );
        res.status(200).json({
            question: data[0][0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const createQuestion = (req, res) => {
    const user = req.body;
    res.send(`Create user: ${JSON.stringify(user)}`);
};

export const updateQuestion = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    res.send(`Update user with ID: ${id}`);
}