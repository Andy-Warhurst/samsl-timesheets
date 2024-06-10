import "./Selector.css"
import React, {useContext} from "react";
import FormControl from "react-bootstrap/FormControl";
//import UserContext from "./UserContext";
import {useData} from "./DataContext";

//const Rounds = [1,2,3,4,5,6,7,8];

const Selector = ({round, team, guests, dispatch, players, fixtures}) => {


  //const { data, updateUserField } = useContext(UserContext);
  const { data, updateUserField } = useData();

  //console.log(fixtures);

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
            <tr >
              <th>Select</th>
              <th>Name</th>
              <th>Shirt</th>
            </tr>
            {players.map(p => (
                <tr>
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
          </table>


  );
};

export default Selector;
