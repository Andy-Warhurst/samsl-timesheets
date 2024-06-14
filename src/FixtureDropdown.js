import React, { useState } from 'react';
//import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";
import {extractFixturesByRound} from "./Fixtures";

const FixtureDropdown = ({ fixtures }) => {

    const [round, setRound] = useState('1');

    const { updateUserField } = useData();
    const Rounds = [' ','8','9','10','11','12','13','14','15','16','17','18'];

    function updateRound (selection) {

        if (selection !== round) {
            setRound(selection);
            updateUserField('round', selection);
            const theFixture = fixtures.filter(extractFixturesByRound(selection));

            if (theFixture.length > 0) {
                updateUserField('homeTeamName', theFixture[0].hometeam);
                updateUserField('awayTeamName', theFixture[0].awayteam);
                updateUserField('venue', theFixture[0].venue);
                updateUserField('dateAndTime', theFixture[0].date + " " + theFixture[0].time);
            }
        }
    }

    return (
        <div>
            <label htmlFor="round"
                   style={{fontSize: 28}}>
                Round
                <select
                    id="round"
                    value={round}
                    style={{fontSize: 28}}
                    placeholder="Round"
                    onChange={(e) =>
                        updateRound (e.target.value)
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
