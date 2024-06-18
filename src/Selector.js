import "./Selector.css"
import React, {useEffect, useState} from "react";
import FormControl from "react-bootstrap/FormControl";
import {useData} from "./DataContext";
import {usePlayers} from "./PlayerContext";

const Selector = (props) => {

    const { data, updateUserField } = useData();
    const {players, updatePlayer} = usePlayers(); // , , fetchAllPlayers
    const [myPlayers, setMyPlayers] = useState(players);

    useEffect(() => {

        function extractPlayersByTeam(plr) {
            return plr.team === props.team;
        }

        setMyPlayers(players.filter(extractPlayersByTeam).sort((a, b) => a.name > b.name));
    }, [players, props.team]);

    //const players = allPlayers.filter(extractPlayersByTeam).sort((a, b) => a.name > b.name);



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
    updatePlayer (player);
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
        {myPlayers.map(p => (
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
                        value={p.shirtno}
                        onChange={(e) => updateShirtNumber(p, e.target.value)}
                    />
                </td>
            </tr>
        ))}

        </tbody>
      </table>


);

};

export default Selector;
