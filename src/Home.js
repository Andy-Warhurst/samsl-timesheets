import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
import Round from "./Round";
import { useState} from "react";
import { extractFixturesByTeam} from "./Fixtures";
import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";
import TeamsDropdown from "./TeamsDropdown";
import FixtureDropdown from "./FixtureDropdown";

function Home() {
    const { isAuthenticated,user } = useAuth0();
    const { getTeamsForUser } = useData(); // getTeamForUser, , updateUserField data,
    const { fixtures } = useFixtures();
    let myFixtures = [];
    let myTeam ="";
    let myTeams = [];

    function isMoreThanOne() {
        return (myTeams.length > 1);
    }

    const initialState = {
        round : Round(),
        selected: [],
    };
    const [state] = useState(initialState);
    const {  round,  selected} = state;


    if (isAuthenticated) {

        //myTeam = getTeamForUser(user.email);

        myTeams = getTeamsForUser(user.email);
        if (myTeams.length > 0) {
            myTeam = myTeams[0]; // Set the first matching team name
        }

        myFixtures = fixtures.filter(extractFixturesByTeam(myTeam));

        // const theFixture = fixtures.filter(extractFixturesByRound(round));
        //
        // if (theFixture.length > 0) {
        //     updateUserField('homeTeamName', theFixture[0].hometeam);
        //     updateUserField('awayTeamName', theFixture[0].awayteam);
        //     updateUserField('venue', theFixture[0].venue);
        //     updateUserField('dateAndTime', theFixture[0].date + " " + theFixture[0].time);
        // }
    }
    return (
        <div>
                {!isAuthenticated && (
                    <>
                        <p>Please Login to use this App. </p>

                    </>
                )}
                {isAuthenticated && (
                    // isLoaded && (
                        <>

                            <div className="container">
                                <div className="component">
                                    { isMoreThanOne ? (
                                        <TeamsDropdown teams={myTeams} />
                                    ): (
                                        <h1>{myTeam}</h1>
                                    )}
                                </div>
                                <div className="component">
                                    <FixtureDropdown fixtures={fixtures} />
                                </div>
                            </div>

                        <MyTeam
                            user={user}
                            round={round}
                            selected={selected}
                            fixtures={myFixtures}
                        />
                    </>

                // )
                    )}

        </div>
    );
}

export default Home;
