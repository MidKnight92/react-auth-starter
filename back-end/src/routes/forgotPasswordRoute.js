import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';
import { getDbConnection } from "../db";


export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        try {
            const { email } = req.params;
            const db = getDbConnection();

            if (!(await db.collection('user').findOne({ email }))) return res.status(200).json({ message: 'If this email is registered, a reset link will be sent.' });

            const passwordResetCode = uuid();

            const user = await db.collection('user').updateOne({ email }, {
                $set: { passwordResetCode }
            });

            if (user.modifiedCount > 0) {
                await sendEmail({
                    to: email,
                    from: process.env.EMAIL,
                    subject: 'Password Reset',
                    text: `
                To reset your password, click this link:
                http://localhost:3000/reset-password/${passwordResetCode}`
                });
            }
            return res.status(200).json({ message: 'If this email is registered, a reset link will be sent.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while resetting your password.' });
        }
    }
}