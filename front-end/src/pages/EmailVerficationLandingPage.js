import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";
import StatusMessageWrapper from "./StatusMessageWrapper";

const successProps = {
    header: 'Verfication Successful',
    message: "Thank you for verifying your email. Please enjoy all the app's features.",
    path: '/',
    buttonText: 'Go back home',
}

const failureProps = {
    header: 'Verfication Unsuccessful',
    message: "Please sign up and verify your email to enjoy all the app's features.",
    path: '/signup',
    buttonText: 'Sign up',
}

  const loadToken = async (verification, setIsSuccessful, setAuthToken, setIsLoading) => {
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

const EmailVerficationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const { verification } = useParams();
    const [, setAuthToken] = useToken();

    useEffect(() => {
        loadToken(verification, setIsSuccessful, setAuthToken, setIsLoading);
    }, [setAuthToken, verification]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return isSuccessful ? <StatusMessageWrapper {...successProps} /> : <StatusMessageWrapper {...failureProps} />;

}

export default EmailVerficationLandingPage;