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

    const [isLoaded, setIsLoaded] = useState(false);

    const [data, setData] = useState({
        userTeams: [],
        selectedPlayers: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllUserTeams();
            setData({userTeams: result, selectedPlayers: []});
            setIsLoaded(true);
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


    const getTeamForUser = (theUserEmail) => {
        for (let item of data.userTeams) {
            if (item.email === theUserEmail) {
                return item.team;
            }
        }
        return "";
    }

    return (
        <DataContext.Provider value={{
            isLoaded,
            data,
            getTeamForUser,
            updateUserField
        }}>
            {children}
        </DataContext.Provider>
    );
};
