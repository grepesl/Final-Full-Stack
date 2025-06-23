import database from "../database.js";

export const changeReaction = async (req, res) => {
    //status
    //Like -> 1
    //Dislike -> -1
    //Bybys = 0
    // status, question_uuid

    try {
        await database.promise().query(`
          INSERT INTO likes (question_uuid, user_uuid, value)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE value = VALUES(value);
        `, [req.body.question_uuid, req.user.uuid, req.body.value]);

        res.status(200).json({ status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

// GET /likes/:question_uuid
export const getReactionByQuestion = async (req, res) => {
    const question_uuid = req.params.question_uuid;
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