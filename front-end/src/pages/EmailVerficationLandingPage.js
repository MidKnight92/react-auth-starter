import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";
import EmailVerifcationSuccessPage from './EmailVerficationSuccessPage';
import EmailVerifcationUnsuccessfulPage from './EmailVerficationUnsuccessfulPage';

const EmailVerficationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const { verification } = useParams();
    const [, setAuthToken] = useToken();



    useEffect(() => {
        const loadToken = async () => {
            try {
                const response = await axios.put('/api/verify-email', { verification });
                const { token } = response.data;
                setAuthToken(token);
                setIsSuccessful(true);
            } catch (error) {
                console.error(error);
                setIsSuccessful(false)
            } finally {
                setIsLoading(false);
            }
        }
        loadToken();
    }, [verification, setAuthToken]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return !isSuccessful ? <EmailVerifcationUnsuccessfulPage /> : <EmailVerifcationSuccessPage />;

}

export default EmailVerficationLandingPage;