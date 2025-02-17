import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db'

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        try {
            const { authorization } = req.headers;
            const { userId } = req.params;
            const { favoriteFood, hairColor, bio } = req.body


            if (!authorization) return res.status(401).json({ message: 'Not authorized' });

            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            const { id } = decoded;

            if (id !== userId) return res.status(403).json({ message: "Not authoried to make updates to this user's info" });

            const db = getDbConnection('react-auth-db');
            const updateUser = await db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { info: { favoriteFood, hairColor, bio } } },
                { returnDocument: 'after' },
            );

            if (!updateUser.value) return res.status(404).json({ message: 'User not found' });

            const { email, isVerified, info } = updateUser.value;

            const newToken = jwt.sign({ id, email, isVerified, info }, process.env.JWT_TOKEN, { expiresIn: '2d' });

            res.status(200).json({ token: newToken })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occured' });
        }

    }
}