import React, { useState } from 'react';
import {useFixtures} from "./FixtureContext";

const FixtureDropdown = ({ options }) => {

    const {fixtures} = useFixtures();

    const fixtureOptions = [];
    fixtures.forEach(item => {
        fixtureOptions.push({ game: item.homeTeam + " v" + item.awayTeam });
    });

    options = fixtureOptions;

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            {/*<label htmlFor="dropdown">Choose an option:</label>*/}
            <select id="dropdown" value={selectedOption} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {/*<p>Selected: {selectedOption}</p>*/}
        </div>
    );
};

export default FixtureDropdown;
