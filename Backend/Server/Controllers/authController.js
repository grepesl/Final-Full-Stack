import database from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const userRequest = req.body;

        const databaseUser = await database.promise().query(
            `SELECT * FROM users WHERE email = ?`,[userRequest.email]
        );

        if (!databaseUser[0] || databaseUser[0].length === 0) {
            return res.status(401).json({ message: "Vartotojas nerastas" });
        }

        console.log(userRequest)
        console.log(databaseUser[0][0])

        const databaseUserPassword = databaseUser[0][0].password;
        const isMatching = bcrypt.compareSync(userRequest.password, databaseUserPassword);

        console.log("isMatching", isMatching);

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
                message: "OK",
                jwt: token
            });
        } else {
            return res.status(401).json({ message: "Neteisingi duomenys" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};