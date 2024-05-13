//import Teams from "./TeamData.json";
import FIXTURES from "./fixtures24.json";

export default function getNextFixture(teamName) {

    const matchingFixtures = FIXTURES.filter(selectFixture);
    const theFixture = matchingFixtures[0];

    function selectFixture(x) {

        const today = new Date();
        const daysUntilSunday = (7 - today.getDay()) % 7;
        const nextSunday = new Date(today);
        nextSunday.setDate(today.getDate() + daysUntilSunday || 7);
        nextSunday.setHours(0, 0, 0, 0);

        today.setHours(0, 0, 0, 0);

        const parts = x.date.split('/');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1; // Adjust month
        const day = parseInt(parts[0], 10);

        const fixDate = new Date(year + 2000, month, day);
        fixDate.setHours(0, 0, 0, 0);

        return (
            (((fixDate - nextSunday) === 0 && x.hometeam === teamName) ||
                ((fixDate - nextSunday) === 0 && x.awayteam === teamName))
        );
    };
    return theFixture;
}
