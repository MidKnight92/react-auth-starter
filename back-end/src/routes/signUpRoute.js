import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        if (user) {
            res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const documentData = {
            email,
            info: {
                hairColor: '',
                favoriteFood: '',
                bio: '',
            },
            isVerified: false,
        };
        const result = await db.collection('users').insertOne({ ...documentData, passwordHash });

        const { insertedId } = result;
        const secret = process.env.JWT_TOKEN;

        jwt.sign({
            id: insertedId,
            ...documentData,
        },
            secret,
            {
                expiresIn: '2d',
            }, (err, token) => {
                if (err) {
                    console.error(err)
                    return res.sendStatus(500);
                }

                res.status(200).json({ token });
            })
    }
}