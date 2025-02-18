import { useNavigate } from "react-router-dom";

const EmailVerficationSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className="content-container">
            <h1>Verfication Successful</h1>
            <p>Thank you for verifying your email. Please enjoy all the app's features.</p>
            <button type="button" onClick={() => navigate('/')}>Go back home</button>
        </div>
    );
}

export default EmailVerficationSuccessPage; 