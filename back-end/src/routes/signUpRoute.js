import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        try {
            const { email, password } = req.body;
            const db = getDbConnection('react-auth-db');
            const user = await db.collection('users').findOne({ email });
            if (user) {
                return res.status(409).json({ message: 'Conflict: A user with the same email already exists.' });
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

            const token = jwt.sign({ id: insertedId, ...documentData }, process.env.JWT_TOKEN, { expiresIn: '2d' });

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occured' });
        }
    }
}