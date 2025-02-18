import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToken } from '../auth/useToken';
import axios from 'axios';

const SignUpPage = () => {
    const [, setAuthToken] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post('/api/signup', {
                email,
                password
            });

            const { token } = response.data;
            setAuthToken(token);
            navigate('/please-verify');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message } = error.response.data;
                console.error(message)
                setError(message);
            }
        }
    }

    return (
        <div className="content-container">
            <h1>Sign up</h1>
            {error && (
                <div>
                    {error}
                </div>
            )}
            <input placeholder="example@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="confirm password" type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
            <hr />
            <button onClick={handleSignUp} disabled={(!(email && password)) || (password !== confirmedPassword)}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Already have an account? Log In</button>
        </div>
    );
}

export default SignUpPage;