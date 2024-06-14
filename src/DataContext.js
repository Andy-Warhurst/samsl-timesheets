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
        theTeamName : "Unknown",
        homeTeamName : "Unknown",
        awayTeamName : "Unknown",
        dateAndTime : "Unknown",
        venue : "Unknown",
        round : "Unknown",
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllUserTeams();
            setData({
                userTeams: result,
                selectedPlayers: [],
                theTeamName : "This Team",
                homeTeamName : "Home Team",
                awayTeamName : "Away Team",
                dateAndTime : "KO Time",
                venue : "Place and Pitch",
                round : "8",
            });
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
                //data.theTeamName = item.team;
                return item.team;
            }
        }
        return "";
    }

    const getTeamsForUser = (theUserEmail) => {
        const teams = [];
        for (let item of data.userTeams) {
            if (item.email === theUserEmail) {
                teams.push(item.team);
            }
        }

        // if (teams.length > 0) {
        //     data.theTeamName = teams[teams.length - 1]; // Set the last matching team name
        // }

        return teams;
    }

    return (
        <DataContext.Provider value={{
            isLoaded,
            data,
            getTeamForUser,
            getTeamsForUser,
            updateUserField
        }}>
            {children}
        </DataContext.Provider>
    );
};
