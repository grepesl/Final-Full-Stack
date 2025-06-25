import database from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v4 as generateID} from "uuid";

export const login = async (req, res) => {
    try {
        const userRequest = req.body;

        const databaseUser = await database.promise().query(
            `SELECT * FROM users WHERE email = ?`,[userRequest.email]
        );

        if (!databaseUser[0] || databaseUser[0].length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const databaseUserPassword = databaseUser[0][0].password;
        const isMatching = bcrypt.compareSync(userRequest.password, databaseUserPassword);

        if (isMatching) {
            const token = jwt.sign(
                {
                    uuid: databaseUser[0][0].uuid,
                    email: databaseUser[0][0].email
                },
                process.env.JWT_SECRET,
                { expiresIn: "8h" }
            );

            return res.status(200).json({
                status: 200,
                jwt: token,
                user: databaseUser[0][0],
            });
        } else {
            return res.status(401).json({ message: "Invalid data" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const registerUser = async (req, res) => {
    try {
        const user = req.body;
        const uuid = generateID();
        const password = bcrypt.hashSync(user.password, 10);

        const data = await database.promise().query(
            'INSERT INTO `users` (`uuid`, `username`, `email`, `password`) VALUES (?,?,?,?)',
            [uuid, user.username, user.email, password]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {

        if (err.sqlState === '23000'){
            res.status(500).json({ message: 'Username or email already exist' });
        } else {
            res.status(500).json({ message: err });
        }
    }
};