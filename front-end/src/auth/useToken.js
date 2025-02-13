import { useState } from 'react';

export const useToken = () => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const setAuthToken = newToken => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    return [token, setAuthToken];
}