import {useState, useEffect} from 'react';
import { useToken } from './useToken';

const getPayloadFromToken = token => {
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const useUser = () => {
    const [token] = useToken();    
    const [user, setUser] = useState(() => getPayloadFromToken(token));
      
    useEffect(() => {
        setUser( getPayloadFromToken(token));
    }, [token]);
    
    return user;
}