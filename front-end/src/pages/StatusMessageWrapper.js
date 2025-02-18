import { useNavigate } from "react-router-dom";

const StatusMessageWrapper = ({ header, message, path, buttonText }) => {
    const navigate = useNavigate();
    return (
        <div className="content-container">
            <h1>{header}</h1>
            <p>{message}</p>
            <button type="button" onClick={() => navigate(path)}>{buttonText}</button>
        </div>
    );
}

export default StatusMessageWrapper;