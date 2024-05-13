import React from "react";
import FixtureDetails from "./FixtureDetails";
import PlayerList from "./PlayerList";
import Result from "./Result";
import Officials from "./Officials";

const PrintPreview = (props) => {

    const theTeam = props.team;

    return (

        <div className="printArea" >
            <FixtureDetails
                team={props.team}
            />
            <PlayerList team={props.team} players={props.selected} />
            <br />
            <Result
                team={theTeam} />
                <br />
                <Officials />
        </div>
    );
};

export default PrintPreview;
