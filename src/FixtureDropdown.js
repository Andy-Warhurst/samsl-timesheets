import React, { useState} from 'react';
import {useData} from "./DataContext";

const FixtureDropdown = () => {

    const { data, updateUserField } = useData();
    const [round, setRound] = useState(data.round);

    const Rounds = ['1','2','3'];

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
