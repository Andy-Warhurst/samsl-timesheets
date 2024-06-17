import "./Selector.css"
import React from "react";
import FormControl from "react-bootstrap/FormControl";
import {useData} from "./DataContext";

import PLAYERS from "./Players.json";

const Selector = (props) => {

    const allPlayers = PLAYERS;

    const players = allPlayers.filter(extractPlayersByTeam).sort((a, b) => a.name > b.name);

  const { data, updateUserField } = useData();


  function updateSelected (selection) {

    var updatedSelections = [];
    updatedSelections = updatedSelections.concat(data.selectedPlayers);

    if (!updatedSelections.includes(selection)) {
      updatedSelections.push(selection);
    } else {
      var index = updatedSelections.indexOf(selection);
      updatedSelections.splice(index, 1);
    }

    updateUserField('selectedPlayers', updatedSelections);
  }

  function updateShirtNumber(player, number) {
    player.shirtno = number;

  }



  return (

        // <div className="player-container">

      <table className="player-selector-table">
        <tbody>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Shirt</th>
        </tr>
        {players.map(p => (
            <tr key={p.id}>
                <td>
                    <input
                        className="player-checkbox"
                        type="checkbox"
                        id={"playing".concat(p.id)}
                        size="20"
                        onClick={() => updateSelected(p)}
                    />
                </td>
                <td className="player-name" align='left'>{p.name}</td>
                <td width='50'>
                    <FormControl
                        className={"player-shirt"}
                        id={"shirtnumber".concat(p.id)}
                        name={"shirtnumber".concat(p.id)}
                        type="text"
                        onChange={(e) => updateShirtNumber(p, e.target.value)}
                    />
                </td>
            </tr>
        ))}

        </tbody>
      </table>


);

    function extractPlayersByTeam(plr) {
        return plr.team === props.team;
    }
};

export default Selector;
