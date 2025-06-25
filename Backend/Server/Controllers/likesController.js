import database from "../database.js";

export const changeReaction = async (req, res) => {

    try {
        await database.promise().query(`
          INSERT INTO likes (question_uuid, user_uuid, value)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE value = VALUES(value);
        `, [req.body.question_uuid, req.user.uuid, req.body.value]);

        res.status(200).json({ status: 200 });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const getReactionByQuestion = async (req, res) => {
    const question_uuid = req.params.id;
    const user_uuid = req.user.uuid;

    const [rows] = await database.promise().query(`
    SELECT value FROM likes WHERE question_uuid = ? AND user_uuid = ?
  `, [question_uuid, user_uuid]);

    if (rows.length > 0) {
        res.json({ status: 200, value: rows[0].value });
    } else {
        res.json({ status: 500, value: 0 });
    }
}