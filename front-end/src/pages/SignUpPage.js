import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        console.log('clicked sign up')
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
            <input placeholder="confirm password" type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
            <button onClick={handleSignUp} disabled={(!email && !password) || (password !== confirmedPassword)}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Already have an account? Log In</button>
        </div>
    );
}

export default SignUpPage;