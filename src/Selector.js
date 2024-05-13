import React from "react";
import Players from "./Players.json";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from "react-bootstrap/FormControl";

//const Rounds = [1,2,3,4,5,6,7,8];

const Selector = ({round, team, guests, selected, dispatch}) => {

  var availablePlayers = Players;
  availablePlayers = availablePlayers.filter(extractPlayersByTeam).sort((a, b) => a.name > b.name);
  availablePlayers = availablePlayers.concat(guests);
  availablePlayers = availablePlayers.filter(extractPlayersByTeam);
  
  function extractPlayersByTeam(plr) {
    return plr.team === team;    
  }

  function updateSelected (selection) {

    var updatedSelections = [];
    updatedSelections = updatedSelections.concat(selected);

    if (!updatedSelections.includes(selection)) {
      // updatedSelections[updatedSelections.length] = selection;
      updatedSelections.push(selection);
    } else {
      var index = updatedSelections.indexOf(selection);
      updatedSelections.splice(index, 1);
    }

    dispatch({type: 'CHANGE_SELECTED', payload: updatedSelections});

  }

  function updateShirtNumber(player, number) {
    player.shirtno = number;

  }



  return (

    <div className="teamsheet-generator">

     <b>{team}</b>

      <Form>

      {/*<label htmlFor="round">*/}
      {/*    Round*/}
      {/*    <select*/}
      {/*      id="round"*/}
      {/*      value={round}*/}
      {/*      placeholder="Round"*/}
      {/*      onChange={(e) =>*/}
      {/*        dispatch({ type: "CHANGE_ROUND", payload: e.target.value })*/}
      {/*      }*/}
      {/*      onBlur={(e) =>*/}
      {/*        dispatch({ type: "CHANGE_ROUND", payload: e.target.value })*/}
      {/*      }*/}
      {/*    >*/}
      {/*      {Rounds.map((round) => (*/}
      {/*        <option key={round} value={round}>*/}
      {/*          {round}*/}
      {/*        </option>*/}
      {/*      ))}*/}
      {/*    </select>*/}
      {/*  </label>*/}

        {
          availablePlayers.map(p => (
            <Row style={{fontSize: 14}}>
              <Col md={{ span: 9}}>
                  <Form.Check
                      id={"playing".concat(p.id)}
                      label={p.name}
                      onClick={() => updateSelected(p)}
                  />
              </Col>
              <Col md={{ span: 3}}>
                  <FormControl
                      style={{fontSize: 12, padding: 5}}
                      id={"shirtnumber".concat(p.id)}
                      name={"shirtnumber"}
                      type="text"
                      onChange={(e) => updateShirtNumber(p,e.target.value)}
                  />
              </Col>
            </Row>
          ))
        }

      </Form>

    </div>
  );
};

export default Selector;
