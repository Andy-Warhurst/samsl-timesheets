import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    fetchAllPlayers,
    fetchPlayerById,
    addPlayer,
    updatePlayer,
    deletePlayer
} from './PlayerService';

const PlayerContext = createContext();

export const usePlayers = () => {
    return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    console.log(selectedPlayer);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllPlayers();
            setPlayers(result);
        };
        fetchData();
    }, []);

    const addPlayerHandler = async (player) => {
        const newPlayer = await addPlayer(player);
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    };

    const updatePlayerHandler = async (updatedData) => {
        const updatedPlayer = await updatePlayer(updatedData.id, updatedData);
        setPlayers((prevPlayers) => prevPlayers.map((player) => (player.id === updatedData.id ? updatedPlayer : player)));
    };

    const deletePlayerHandler = async (id) => {
        await deletePlayer(id);
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
    };

    const fetchPlayerByIdHandler = async (id) => {
        const player = await fetchPlayerById(id);
        setSelectedPlayer(player);
    };

    return (
        <PlayerContext.Provider value={{
            players,
            fetchPlayerByID: fetchPlayerByIdHandler,
            addPlayer: addPlayerHandler,
            updatePlayer: updatePlayerHandler,
            deletePlayer: deletePlayerHandler }}>
            {children}
        </PlayerContext.Provider>
    );
};
