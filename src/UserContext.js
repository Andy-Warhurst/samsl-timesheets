// UserContext.js
import React, { createContext, useState } from 'react';
//import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

   // var reloadRequired = true;

    const [data, setData] = useState({
        userName: 'Andy',
        email: 'Andy@gmail.com',
        teamName: 'University Old Boys',
        selectedPlayers: []
    });

    // Function to update a specific field in the user state
    const updateUserField = (field, value) => {
        setData((prevUser) => ({
            ...prevUser,
            [field]: value
        }));
    };

    // if (reloadRequired === true) {
    //     axios.get(
    //         "https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/items"
    //     )
    //         .then((res) => {
    //             updateUserField('selectedPlayers', res.data);
    //             reloadRequired = false;
    //         })
    //         .catch((res) => {
    //                 console.log("Error: " + res.error);
    //             }
    //         );
    // }
    return (
        <UserContext.Provider value={{ data, updateUserField }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
