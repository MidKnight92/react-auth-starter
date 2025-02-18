import { useNavigate } from "react-router-dom";

const EmailVerficationUnsuccessfulPage = () => {
    const navigate = useNavigate();
    return (
        <div className="content-container">
            <h1>Verfication Unsuccessful</h1>
            <p>Please sign up and verify your email to enjoy all the app's features.</p>
            <button type="button" onClick={() => navigate('/signup')}>Sign up</button>
        </div>
    );
}

export default EmailVerficationUnsuccessfulPage