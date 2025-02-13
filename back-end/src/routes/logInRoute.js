import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email: requestEmail, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email: requestEmail });
        if (!(user && await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: 'Email or password is incorrect.' });
        }
        const { _id: id, isVerified, email, info } = user;
        const secret = process.env.JWT_TOKEN;

        jwt.sign({ id, isVerified, info, email },
            secret,
            {
                expiresIn: '2d',
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error occurred.' });
                }
                res.status(200).json({ token });
            }
        )
    }
}