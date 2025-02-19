import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        try {
            const { email: requestEmail, password } = req.body;
            const db = getDbConnection('react-auth-db');
            const user = await db.collection('users').findOne({ email: requestEmail });

            if (!user) return res.status(401).json({ message: 'Email or password is incorrect.' });
            
            const { _id: id, isVerified, email, info, salt} = user;
            const pepper = process.env.PEPPER;    

            const passwordsMatch  = await bcrypt.compare(`${salt}${password}${pepper}`, user.passwordHash);
            if (!passwordsMatch) return res.status(401).json({ message: 'Email or password is incorrect.' });

            const token = jwt.sign({ id, isVerified, info, email }, process.env.JWT_TOKEN, { expiresIn: '2d' });
            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occured' });
        }
    }
}