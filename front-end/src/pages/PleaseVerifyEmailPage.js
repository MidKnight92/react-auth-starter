import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const REDIRECT_DELAY = 3000;

const PleaseVerifyEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, REDIRECT_DELAY);

        return () => clearTimeout(timeoutId);
    }, [navigate])
    return (
        <div className='content-container'>
            <h1>Hey! Thanks for Signing Up!</h1>
            <p>
                A verification email has been sent to the email address you provided.
                Please verify your email in order to unluck full site features.
            </p>
            <p>You will be automatically redirect in {REDIRECT_DELAY / 1000} seconds...</p>
        </div>
    );
}

export default PleaseVerifyEmailPage;