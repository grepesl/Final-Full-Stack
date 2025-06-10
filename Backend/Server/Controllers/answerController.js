// controllers/userController.js
import database from './../database.js';

export const getAnswers = async (req, res) => {
    try {
        const data = await database.promise().query(
            `SELECT * FROM answers`
        );
        res.status(200).json({
            answers: data[0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const getAnswerById = async (req, res) => {
    const { id } = req.params

    try {
        const data = await database.promise().query(
            `SELECT * FROM answers WHERE uuid = ?`,[id]
        );
        res.status(200).json({
            answer: data[0][0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const createAnswer = (req, res) => {
    const user = req.body;
    res.send(`Create user: ${JSON.stringify(user)}`);
};

export const updateAnswer = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    res.send(`Update user with ID: ${id}`);
}