import React from "react";

const PlayerList = (props) => {
  var sortedPlayers = props.players.sort((a, b) => a.name > b.name);

  const items = [];
  var i;
  for (i = props.players.length; i < 21; i++) {
    items.push(
      <tr key={i} height="24">
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    );
  }

  return (
    <div className="player-list">
      <table>
        <tbody>
          <tr align="left">
            <th>Players of {props.team}</th>
          </tr>
        </tbody>
      </table>
      {/* <h3>Players of {props.team}</h3> */}
      <table>
        <thead>
          <tr>
            <th>FFA No.</th>
            <th>Shirt</th>
            <th width="250">Player Name</th>
            <th>Guest</th>
            <th width="100">Goals</th>
            <th width="100">Cards</th>
            <th width="200">Injuries</th>
            <th width="50">3-2-1</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td align="center" >{p.shirtno}</td>
              <td>{p.name}</td>
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
          {items}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
