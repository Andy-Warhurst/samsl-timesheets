import React from "react";
//import FIXTURES from "./fixtures24.json";
//import Teams from "./TeamData.json";
import getNextFixture from "./NextFixture";

const FixtureDetails = (props) => {

  const theFixture = getNextFixture(props.team);

  return (
    <div className="fixture-details">
      <table className="fixture-details-top">
        <tbody>
          <tr>
            <th width="590" height="40">
              {theFixture.hometeam} v {theFixture.awayteam} (Division{" "}
              {theFixture.division})
            </th>
            {/* 
            <th className="samsl-logo" width="50px">
              SAMSL
            </th> */}
          </tr>
        </tbody>
      </table>
      <table className="fixture-details-bottom">
        <tbody>
          <tr>
            <td width="220">Round {props.round}</td>
            <td width="220">
              {theFixture.date} {theFixture.time}{" "}
            </td>
            <td>{theFixture.venue}</td>
          </tr>
        </tbody>
      </table>

      {/* Don't forget to add the logo image */}
    </div>
  );
};

export default FixtureDetails;
