import React, {useEffect, useState} from 'react';
import {useData} from "./DataContext";

const TeamsDropdown = ({ teams }) => {

    const [initialised, setInitialised] = useState(false);

    const [team, setTeam] = useState("");

    const { data, updateUserField } = useData();

    if (!initialised)  {
        updateUserField('theTeamName', teams[0]);
        updateUserField('round', '8');
        setInitialised(true);
    }

    useEffect(() => {
        if (data.theTeamName) {
            setTeam(data.theTeamName);
        }
    }, [data.theTeamName]);

    function updateTeam (selection) {

        if (selection !== team) {
            //setTeam(selection);
            updateUserField('theTeamName', selection);
        }
    }

    return (
        <div>
            <label htmlFor="teams"
                   style={{fontSize: 28}}>

                <select
                    id="teams"
                    value={team}
                    // aria-describedby="basic-addon2"
                    style={{fontSize: 28}}
                    placeholder="Team"
                    onChange={(e) =>
                        updateTeam (e.target.value)
                    }
                >
                    {teams.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default TeamsDropdown;
