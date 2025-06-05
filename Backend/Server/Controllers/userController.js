// controllers/userController.js
import database from './../database.js';

export const getUsers = (req, res) => {
    database.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
};

export const getUserById = (req, res) => {
    const id = req.params.id;
    res.send(`Get user with ID: ${id}`);
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