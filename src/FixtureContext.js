import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    fetchAllFixtures,
    // fetchFixtureById,
    addFixture,
    updateFixture,
    deleteFixture
} from './FixtureService';

const FixtureContext = createContext();

export const useFixtures = () => {
    return useContext(FixtureContext);
};

export const FixtureProvider = ({ children }) => {
    const [fixtures, setFixtures] = useState([]);
    //const [selectedFixture, setSelectedFixture] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllFixtures();
            setFixtures(result);
        };
        fetchData();
    }, []);

    const addFixtureHandler = async (Fixture) => {
        const newFixture = await addFixture(Fixture);
        setFixtures((prevFixtures) => [...prevFixtures, newFixture]);
    };

    const updateFixtureHandler = async (updatedData) => {
        const updatedFixture = await updateFixture(updatedData.id, updatedData);
        setFixtures((prevFixtures) => prevFixtures.map((Fixture) => (Fixture.id === updatedData.id ? updatedFixture : Fixture)));
    };

    const deleteFixtureHandler = async (id) => {
        await deleteFixture(id);
        setFixtures((prevFixtures) => prevFixtures.filter((Fixture) => Fixture.id !== id));
    };

    // const fetchFixtureByIdHandler = async (id) => {
    //     const Fixture = await fetchFixtureById(id);
    //     //setSelectedFixture(Fixture);
    // };

    return (
        <FixtureContext.Provider value={{ fixtures,
            // fetchFixtureByID: fetchFixtureByIdHandler,
            addFixture: addFixtureHandler,
            updateFixture: updateFixtureHandler,
            deleteFixture: deleteFixtureHandler }}>
            {children}
        </FixtureContext.Provider>
    );
};
