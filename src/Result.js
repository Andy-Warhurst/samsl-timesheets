import React from "react";
import getNextFixture from "./NextFixture";

const Result = (props) => {

  const theFixture = getNextFixture(props.team);

  return (
    <div className="results-table">
      <table>
        <thead>
          <tr>
            <th width="250"></th>
            <th width="70">HT</th>
            <th width="70">FT</th>
            <th width="70">ET (HT)</th>
            <th width="70">ET (FT)</th>
            <th width="70">Pens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{theFixture.hometeam}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{theFixture.awayteam}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
