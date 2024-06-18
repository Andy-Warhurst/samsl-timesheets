import React, { useState } from 'react';
//import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";
import {extractFixturesByRound} from "./Fixtures";

const FixtureDropdown = ({ fixtures, team }) => {

    const { data, updateUserField } = useData();
    const [round, setRound] = useState(data.round);
    const Rounds = [' ','8','9','10','11','12','13','14','15','16','17','18'];

    function convertTime(timeStr) {
        // Split the input string into hours and minutes parts
        const [hoursPart, minutesPart] = timeStr.split('.');

        // Convert the parts to integers
        const hours = parseInt(hoursPart, 10);
        let minutes = 0;

        if (minutesPart) {
            minutes = parseInt(minutesPart, 10) * (minutesPart.length === 1 ? 10 : 1);
        }

        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    function updateRound (selection) {

        if (selection !== round) {
            setRound(selection);
            updateUserField('round', selection);
            const theFixture = fixtures.filter(extractFixturesByRound(selection, team));

            if (theFixture.length > 0) {
                updateUserField('homeTeamName', theFixture[0].hometeam);
                updateUserField('awayTeamName', theFixture[0].awayteam);
                updateUserField('venue', theFixture[0].venue);
                updateUserField('dateAndTime', theFixture[0].date + " " + convertTime(theFixture[0].time));
            }
        }
    }

    return (
        <div>
            <label htmlFor="round"
                   style={{fontSize: 28}}>
                Round:
                <select
                    id="round"
                    value={round}
                    style={{fontSize: 28}}
                    placeholder="Round"
                    onChange={(e) => updateRound (e.target.value)
                    }
                >
                    {Rounds.map((round) => (
                        <option key={round} value={round}>
                            {round}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default FixtureDropdown;
