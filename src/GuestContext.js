import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    fetchAllGuests,
    fetchGuestById,
    addGuest,
    updateGuest,
    deleteGuest
} from './GuestService';

const GuestContext = createContext();

export const useGuests = () => {
    return useContext(GuestContext);
};

export const GuestProvider = ({ children }) => {
    const [guests, setGuests] = useState([]);
    const [selectedGuest, setSelectedGuest] = useState(null);

    console.log(selectedGuest);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllGuests();
            setGuests(result);
        };
        fetchData();
    }, []);

    const addGuestHandler = async (guest) => {
        const newGuest = await addGuest(guest);
        setGuests((prevGuests) => [...prevGuests, newGuest]);
    };

    const updateGuestHandler = async (updatedData) => {
        const updatedGuest = await updateGuest(updatedData.id, updatedData);
        setGuests((prevGuests) => prevGuests.map((guest) => (guest.id === updatedData.id ? updatedGuest : guest)));
    };

    const deleteGuestHandler = async (id) => {
        await deleteGuest(id);
        setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
    };

    const fetchGuestByIdHandler = async (id) => {
        const guest = await fetchGuestById(id);
        setSelectedGuest(guest);
    };

    return (
        <GuestContext.Provider value={{ guests,
            fetchGuestByID: fetchGuestByIdHandler, addGuest: addGuestHandler, updateGuest: updateGuestHandler, deleteGuest: deleteGuestHandler }}>
            {children}
        </GuestContext.Provider>
    );
};
