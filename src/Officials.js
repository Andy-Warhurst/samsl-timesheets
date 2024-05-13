import React from "react";

const Officials = () => {
  return (
    <div className="officials-table">
      <table>
        <thead>
          <tr>
            <th width="200">Officials</th>
            <th width="200">Name</th>
            <th width="200">Signature</th>
          </tr>
        </thead>
        <tbody>
          <tr height="40">
            <td>Team Manager/Delegate</td>
            <td />
            <td />
          </tr>
          <tr height="40">
            <td>Referee</td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td valign="top" width={"60%"}>
              <h5>Teams</h5>
              <p>
                Check all information on this team sheet is correct.
              </p>
              <p>
                Sign above if you agree it is correct.
              </p>
              <p>
                SMS results to 0423 380 333 by 5pm.
              </p>
            </td>
            <td valign="top">
              <h5>Referees</h5>
              <p>
                Return this teamsheet to the team after the game{" "}<b>OR</b> {" "}hand it to Razor, Dave Sedgwick or Andy Whitfield.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Officials;
