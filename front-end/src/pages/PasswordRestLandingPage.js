import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PasswordResetSuccessPage from "./PasswordResetSucessPage";
import PasswordResetUnsuccessfulPage from "./PasswordResetUnsuccessfulPage";


const PasswordResetLandingPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const { passwordResetCode } = useParams();

    const checkPasswordsMatch = () => password.trim() && confirmPassword.trim() && password === confirmPassword;
    const handleClick = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { newPassword: password });
            setIsSuccessful(true);
        } catch (error) {
            setIsSuccessful(false);
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }
    if (isLoading) {
        return (
            <div className="content-container">
                <h1>Reset Page</h1>
                <p>Please Enter a new password.</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirmPassword" />
                <button disabled={!checkPasswordsMatch()} onClick={handleClick}>Reset Password</button>
            </div>
        );
    }

    return isSuccessful ? <PasswordResetSuccessPage /> : <PasswordResetUnsuccessfulPage />;
}

export default PasswordResetLandingPage;