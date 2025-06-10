// controllers/userController.js
import database from './../database.js';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcrypt';

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
    res.setHeader('Content-Type', 'application/json');

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

export const  registerUser = async (req, res) => {
    try {
        const user = req.body;

        const uuid = generateID();
        const password = bcrypt.hashSync(user.password, 10);

        const data = await database.promise().query(
            'INSERT INTO `users` (`uuid`, `username`, `email`, `password`) VALUES (?,?,?,?)',
            [uuid, user.username, user.email, password]
        );

        res.status(200).json({ status: 'OK' });
    } catch (err) {
        console.log(err);

        if (err.sqlState === '23000'){
            res.status(500).json({ message: 'Username or email already exist' });
        } else {
            res.status(500).json({ message: err });
        }
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    res.send(`Update user with ID: ${id}`);
}