// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    //const [auser, setData] = useState({ name: 'John Doe', authenticated: true });
    const [data, setData] = useState({
        username: 'Andy',
        email: 'Andy@gmail.com',
        teamname: 'University Old Boys'
    });
    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
