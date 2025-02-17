import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            const testRecipient = process.env.EMAIL.split('@');
            await sendEmail(
                {
                    to: `${testRecipient[0]}+test@${testRecipient[1]}`,
                    from: process.env.EMAIL,
                    subject: 'Test',
                    text: 'working?'
                }
            );
            res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurried' });
        }
    }
}