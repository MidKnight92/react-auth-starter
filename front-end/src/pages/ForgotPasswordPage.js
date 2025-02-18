import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REDIRECT_DELAY = 3000;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId;
        if (isSuccessful){
            timeoutId = setTimeout(() => {
            navigate('/login');
        }, REDIRECT_DELAY);
        }
        return () => clearTimeout(timeoutId);
    }, [isSuccessful]);

    const handleSubmit = async () => {
        try {
            await axios.put(`/api/forgot-password/${email}`);
            setIsSuccessful(true);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.')
        }
    }
    return (
        <div className='content-container'>
            <h1>{isSuccessful ? 'Success' : 'Forgot Password'}</h1>
            <p>{isSuccessful ? 'Check your email for a reset link. You will be redirected to login in 3 seconds.' : "Enter your email and we'll send you a reset link."}</p>
            {!!errorMessage && <div className='fail'>{errorMessage}</div>}
            {!isSuccessful && <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' />}
            {!isSuccessful && <button disabled={!email} onClick={handleSubmit} type='button'>Send Reset Password Link</button>}
        </div>
    );
}

export default ForgotPassword;