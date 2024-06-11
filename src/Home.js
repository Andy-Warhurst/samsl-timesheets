import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
import Round from "./Round";
import {useState} from "react";
import {extractFixturesByTeam} from "./Fixtures";
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
