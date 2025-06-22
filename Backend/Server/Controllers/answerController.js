// controllers/userController.js
import database from './../database.js';
import {v4 as generateID} from "uuid";
import bcrypt from "bcrypt";

export const getAnswers = async (req, res) => {
    const { question_uuid } = req.query

    try {
        let query = `
            SELECT a.*, u.username 
            FROM answers a 
            LEFT JOIN users u ON u.uuid = a.user_uuid
        `;

        const params = [];

        if (question_uuid) {
            query += ` WHERE a.question_uuid = ?`;
            params.push(question_uuid);
        }

        const [rows] = await database.promise().query(query, params);

        res.status(200).json({
            status: 200,
            answers: rows,
        });
    } catch (err) {
        // console.error(err);
        res.status(500).json({
            status: 500,
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

export const createAnswer = async (req, res) => {
    const answer = req.body;
    const user = req.user;

    try {
        const uuid = generateID();
        const data = await database.promise().query(
            'INSERT INTO `answers` (`uuid`, `question_uuid`, `user_uuid`, `content`) VALUES (?,?,?,?)',
            [uuid, answer.question_uuid, user.uuid, answer.content]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        // console.log(err);

        res.status(500).json({status: 500, message: err });
    }
};

export const updateAnswer = async (req, res) => {
    const id = req.params.id;
    const answer = req.body;
    try {

        const data = await database.promise().query(
            'UPDATE `answers` SET `content` = ?, `updated_at` = CURRENT_TIMESTAMP WHERE `uuid` = ? ',
            [answer.content, id]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        // console.log(err);

        res.status(500).json({ message: err });
    }
}

export const deleteAnswer = async (req, res) => {
    const { id } = req.params

    try {

        await database.promise().query(
            `DELETE FROM answers WHERE uuid = ?`,
            [id]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Serverio klaida", error: err });
    }
}