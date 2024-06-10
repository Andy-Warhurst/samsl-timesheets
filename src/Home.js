import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
import Round from "./Round";
import {useState} from "react";
import PLAYERS from "./Players.json";
import {extractFixturesByTeam} from "./Fixtures";
import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";

function Home() {
    const { isAuthenticated } = useAuth0();

    const {  data } = useData();
    const theTeams = data.userTeams;
    console.log(theTeams);

    const myTeam = "University Old Boys";

    const { fixtures } = useFixtures();
    const myFixtures = fixtures.filter(extractFixturesByTeam(myTeam));

    const initialState = {
        user: "",
        teamName: myTeam,
        round : Round(),
        players: PLAYERS,
        selected: [],
    };

    const [state] = useState(initialState);
    const {user, teamName, round, players, selected} = state;

    return (
        <div>

            {/*<header></header>*/}

                {!isAuthenticated && (
                    <>
                        <p>Please Login to use this App. </p>

                    </>
                )}
                {isAuthenticated && (
                    <>

                        <MyTeam
                            user={user}
                            teamName={teamName}
                            round={round}
                            players={players}
                            selected={selected}
                            fixtures={myFixtures}
                        />
                    </>
                )}

        </div>
    );
}

export default Home;
