
const roundDates = [
    {round: '1', date: "2025-05-04"},
    {round: '2', date: "2025-05-18"},
    {round: '3', date: "2025-05-25"},
    // {round: '4', date: "2024-04-28"},
    // {round: '6', date: "2024-05-19"},
    // {round: '5', date: "2024-05-26"},
    // {round: '7', date: "2024-06-02"},
    // {round: '8', date: "2024-06-16"},
    // {round: '9', date: "2024-06-23"},
    // {round: '10', date: "2024-06-30"},
    // {round: 'CUP1', date: "2024-07-07"},
    // {round: '11', date: "2024-07-14"},
    // {round: '12', date: "2024-07-21"},
    // {round: '13', date: "2024-07-28"},
    // {round: '14', date: "2024-06-23"},
    // {round: '15', date: "2024-08-18"},
    // {round: '16', date: "2024-08-25"},
    // {round: '17', date: "2024-09-08"},
    // {round: '18', date: "2024-09-22"},
];

const Round = () => {
    const today = new Date();

    // Find the next round date
    const nextRound = roundDates.find(({ date }) => new Date(date) > today);

    return nextRound ? nextRound.round : 'No more rounds';
};

export default Round;

