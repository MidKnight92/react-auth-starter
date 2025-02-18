import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        try {
            const { verification } = req.body;
            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOne({
                verification,
            });

            if (!result) return res.status(401).json({ message: 'The email verfication code is incorrect.' });

            const { _id: id, email, info } = result;

            await db.collection('users').updateOne({ _id: ObjectId(id) }, {
                $set: { isVerified: true }
            });

            const token = jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_TOKEN, { expiresIn: '2d' });

            res.status(200).json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Email could not be verified.' });
        }
    }
}