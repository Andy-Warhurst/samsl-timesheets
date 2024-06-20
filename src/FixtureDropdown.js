import React, { useState} from 'react';
//import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";
//import {extractFixturesByRound} from "./Fixtures";

const FixtureDropdown = () => {

    const { data, updateUserField } = useData();
    const [round, setRound] = useState(data.round);

    const Rounds = [' ','8','9','10','11','12','13','14','15','16','17','18'];

    function updateRound (selection) {
        setRound(selection);
        updateUserField('round', selection);
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
