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

export const updateUser = async (req, res) => {
    try {
        await database.promise().query(
            'UPDATE `users` SET `username` = ?, `email` = ? WHERE `uuid` = ?',
            [req.body.username, req.body.email,  req.params.id]
        );

        res.status(200).json({ status: 200 });
    } catch (err) {
        if (err.sqlState === '23000'){
            res.status(500).json({ message: 'Username or email already exist' });
        } else {
            res.status(500).json({ message: err });
        }
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {

        await database.promise().query(
            `DELETE FROM users WHERE uuid = ?`,
            [id]
        );

        res.status(200).json({ message: "Account successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}