// controllers/userController.js
import database from './../database.js';
import {v4 as generateID} from "uuid";

export const getQuestions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const [data] = await database.promise().query(`
          SELECT q.*, u.username,
                 (SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) AS answers_count,
                 5 AS likes_count
          FROM questions q
          LEFT JOIN users u ON u.uuid = q.user_uuid
          LIMIT ? OFFSET ?;
        `, [limit, offset]);

        const [totalCounts] = await database.promise().query(`SELECT COUNT(*) AS totalCount FROM questions`);

        const questions = data;
        const totalCount = totalCounts[0].totalCount;

        res.status(200).json({
            status: 200,
            questions: questions,
            totalCount: totalCount,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            error: err,
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
            status: 200,
            question: data[0][0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err,
        });
    }
};

export const createQuestion = async (req, res) => {
    const question = req.body;
    const uuid = generateID();
    try {

        const data = await database.promise().query(
            'INSERT INTO `questions` (`uuid`, `user_uuid`, `title`, `content`, `tags`) VALUES (?,?,?,?,?)',
            [uuid, question.user_uuid, question.title, question.content, question.tags]
        );

        res.status(200).json({ status: 'OK' });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: err });
    }
};

export const updateQuestion = async (req, res) => {
    const id = req.params.id;
    const question = req.body;

    try {

        const data = await database.promise().query(
            'UPDATE `questions` SET `title`= ?, `content` = ?, `tags`= ?, `updated_at` = CURRENT_TIMESTAMP WHERE `uuid` = ? ',
            [question.title, question.content, question.tags, id]
        );

        res.status(200).json({ status: 'OK' });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: err });
    }
}

export const deleteQuestion = async (req, res) => {
    const { id } = req.params

    try {

        await database.promise().query(
            `DELETE FROM questions WHERE uuid = ?`,
            [id]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        res.status(500).json({ message: "Serverio klaida", error: err });
    }
}