import { useState } from 'react';
import User from '../types/user.ts';
import { createContext } from 'react';


export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [User, setUser] = useState(null);

    const login = (user: User) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ User, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
