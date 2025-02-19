import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';


export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        try {
            const { passwordResetCode } = req.params;
            const { password } = req.body;
            if (!password || !passwordResetCode) return res.status(400).json({ message: 'A password and password reset code is required.' })
            const salt = uuid();
            const pepper = process.env.PEPPER;
            const passwordHash = await bcrypt.hash(`${salt}${password}${pepper}`, 10);            
            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOneAndUpdate({ passwordResetCode }, {
                $set: { passwordHash, salt },
                $unset: { passwordResetCode: '' },
            },
                { returnDocument: 'after' });

            if (!result.value) return res.status(404).json({ message: 'The password reset code is incorrect.' });

            return res.status(200).json({ message: 'User password was updated.' })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occured' });
        }
    }
}