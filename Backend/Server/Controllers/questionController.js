// controllers/userController.js
import database from './../database.js';
import {v4 as generateID} from "uuid";

export const getQuestions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Filtrai
    const sort_by_date = req.query.sort_by_date === 'DESC' ? 'DESC' : 'ASC';
    const sort_by_answers = req.query.answers_count === 'DESC' ? 'DESC' : 'ASC';
    const is_answered = req.query.is_answered;
    const name = req.query.name;
    const tag = req.query.tag;

    let whereClauses = [];
    let params = [];

    if (name) {
        whereClauses.push(`q.title LIKE ?`);
        params.push(`%${name}%`);
    }

    if (tag) {
        whereClauses.push(`q.tags LIKE ?`);
        params.push(`%${tag}%`);
    }

    if (is_answered !== 'all') {
        if (is_answered === 'answered') {
            whereClauses.push(`(SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) > 0`);
        } else if (is_answered === 'unanswered') {
            whereClauses.push(`(SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) = 0`);
        }
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    let sortingType = '';

    if (req.query.sorting_type === 'date-desc') {
        sortingType = 'ORDER BY q.created_at DESC';
    } else if (req.query.sorting_type === 'date-asc') {
        sortingType = 'ORDER BY q.created_at ASC';
    } else if (req.query.sorting_type === 'answer-desc') {
        sortingType = 'ORDER BY answers_count DESC';
    } else if (req.query.sorting_type === 'answer-asc') {
        sortingType = 'ORDER BY answers_count ASC';
    }

    const sql = `
        SELECT q.*, u.username,
               (SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) AS answers_count,
               (SELECT SUM(value) FROM likes WHERE question_uuid = q.uuid) AS likes_count
        FROM questions q
        LEFT JOIN users u ON u.uuid = q.user_uuid
        ${whereSQL}
        ${sortingType} 
        LIMIT ? OFFSET ?;
    `;
    console.log(sql);

    try {
        const [data] = await database.promise().query(sql, [...params, limit, offset]);

        const [totalCounts] = await database.promise().query(
            `SELECT COUNT(*) AS totalCount FROM questions q ${whereSQL}`,
            params
        );

        res.status(200).json({
            status: 200,
            questions: data,
            totalCount: totalCounts[0].totalCount,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error',
            error: err,
        });
    }
};

export const getQuestionById = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const data = await database.promise().query(
            `SELECT q.*,
                    u.username,
                    (SELECT COUNT(*) FROM answers WHERE question_uuid = q.uuid) as answers_count,
                    (SELECT SUM(value) FROM likes WHERE question_uuid = q.uuid) AS likes_count
             FROM questions q
                      LEFT JOIN users u ON u.uuid = q.user_uuid 
              WHERE q.uuid = ?`,[id]
        );
        res.status(200).json({
            status: 200,
            question: data[0][0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

export const createQuestion = async (req, res) => {

    const question = req.body;
    const uuid = generateID();

    const user = req.user;
    try {

        const data = await database.promise().query(
            'INSERT INTO `questions` (`uuid`, `user_uuid`, `title`, `content`, `tags`) VALUES (?,?,?,?,?)',
            [uuid, user.uuid, question.title, question.content, question.tags]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        // console.log(err);

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

        res.status(200).json({ status: 200 });
    } catch (err) {
        // console.log(err);

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