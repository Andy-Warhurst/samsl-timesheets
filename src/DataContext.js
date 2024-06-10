import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    fetchAllUserTeams,
} from './DataService';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    //const [data, setData] = useState([]);


    const [data, setData] = useState({
        userTeams: [],
        selectedPlayers: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllUserTeams();
            setData({userTeams: result, selectedPlayers: []});
        };
        fetchData();
    }, []);

    // Function to update a specific field in the user state
    const updateUserField = (field, value) => {
        setData((prevUser) => ({
            ...prevUser,
            [field]: value
        }));
    };

    return (
        <DataContext.Provider value={{
            data,
            updateUserField
        }}>
            {children}
        </DataContext.Provider>
    );
};
