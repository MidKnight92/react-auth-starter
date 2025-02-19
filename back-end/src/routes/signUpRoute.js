import { getDbConnection } from '../db';
import { v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../util/sendEmail';

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
            const salt = uuid();
            const pepper = process.env.PEPPER;
            const passwordHash = await bcrypt.hash(`${salt}${password}${pepper}`, 10);
            const verification = uuid();

            const documentData = {
                email,
                info: {
                    hairColor: '',
                    favoriteFood: '',
                    bio: '',
                },
                isVerified: false,
                verification,
                salt,
            };

            await sendEmail({
                to: email,
                from: process.env.EMAIL,
                subject: 'Please verify your email',
                text: `Thanks for signing up. To verify your email, click here:
                    http://localhost:300/verify-email/${verification}
                `
            });
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