import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogIn = () => {
        console.log('clicked log in')
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {error && (
                <div>
                    {error}
                </div>
            )}
            <input placeholder="example@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <hr />
            <button onClick={handleLogIn} disabled={!email && !password}>Log In</button>
            <button onClick={() => navigate('/forgot-password')}>Forgot your password</button>
            <button onClick={() => navigate('/signup')}>Don't have an account? Sign up</button>
        </div>
    );
}

export default LoginPage;