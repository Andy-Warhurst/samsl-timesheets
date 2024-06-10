import axios from 'axios';

const apiBaseUrl = 'https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com'; // Replace with your AWS Gateway URL

const fetchAllPlayers = async () => {
    const response = await axios.get(`${apiBaseUrl}/players`);
    return response.data;
};

const fetchPlayerById = async (id) => {
    const response = await axios.get(`${apiBaseUrl}/players/${id}`);
    return response.data;
};

const addPlayer = async (player) => {
    const response = await axios.put(`${apiBaseUrl}/players`, player);
    return response.data;
};

const updatePlayer = async (id, updatedData) => {

    const response = await axios.put(`${apiBaseUrl}/players`, updatedData);
    //const response = await axios.put(`${apiBaseUrl}/players/${id}`, updatedData);
    return response.data;
};

const deletePlayer = async (id) => {
    const response = await axios.delete(`${apiBaseUrl}/players/${id}`);
    return response.data;
};

export {
    fetchAllPlayers,
    fetchPlayerById,
    addPlayer,
    updatePlayer,
    deletePlayer
};
