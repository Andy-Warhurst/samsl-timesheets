import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
import Round from "./Round";
import {useState} from "react";
import { extractFixturesByTeam} from "./Fixtures";
import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";

function Home() {
    const { isAuthenticated,user } = useAuth0();
    const { isLoaded, getTeamForUser } = useData();
    const { fixtures } = useFixtures();
    let myFixtures = [];
    let myTeam ="";

    const initialState = {
        round : Round(),
        selected: [],
    };
    const [state] = useState(initialState);
    const {  round,  selected} = state;

    if (isAuthenticated) {
        myTeam = getTeamForUser(user.email);
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
                    isLoaded && (
                    <>
                        <MyTeam
                            user={user}
                            teamName={myTeam}
                            round={round}
                            selected={selected}
                            fixtures={myFixtures}
                        />
                    </>
                ))}

        </div>
    );
}

export default Home;
