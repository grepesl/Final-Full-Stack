// controllers/userController.js
import database from './../database.js';

export const getQuestions = async (req, res) => {
    try {
        const data = await database.promise().query(
            `SELECT * FROM questions`
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
            `SELECT * FROM questions WHERE uuid = ?`,[id]
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