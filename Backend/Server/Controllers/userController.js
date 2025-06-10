// controllers/userController.js
import database from './../database.js';

export const getUsers = async (req, res) => {
    try {
        const data = await database.promise().query(
            `SELECT * FROM users`
        );
        res.status(200).json({
            users: data[0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const data = await database.promise().query(
            `SELECT * FROM users WHERE uuid = ?`,[id]
        );
        res.status(200).json({
            user: data[0][0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const createUser = (req, res) => {
    const user = req.body;
    res.send(`Create user: ${JSON.stringify(user)}`);
};

export const updateUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    res.send(`Update user with ID: ${id}`);
}