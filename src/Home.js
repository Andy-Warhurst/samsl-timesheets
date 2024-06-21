import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
import Round from "./Round";
import {useEffect, useState} from "react";
import { extractFixturesByTeam} from "./Fixtures";
import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";
import TeamsDropdown from "./TeamsDropdown";
import FixtureDropdown from "./FixtureDropdown";
import rego from "./assets/SAMSL_Register.png";
import {useGuests} from "./GuestContext";
import {usePlayers} from "./PlayerContext";

function Home() {
    const { isAuthenticated,user } = useAuth0();
    const { getTeamsForUser, loading: dataLoading } = useData();
    const { fixtures, loading: fixturesLoading } = useFixtures();
    const {loading: guestsLoading } = useGuests();
    const {loading: playersLoading } = usePlayers();
    let myFixtures = [];
    let myTeam ="";
    let myTeams = [];

    const [allDataLoaded, setAllDataLoaded] = useState(false);

    useEffect(() => {
        // Check if all contexts are done loading
        if (!fixturesLoading && !dataLoading && !guestsLoading && !playersLoading) {
            setAllDataLoaded(true);
        }
    }, [ fixturesLoading, dataLoading, guestsLoading, playersLoading]);

    function isMoreThanOne() {
        return (myTeams.length > 1);
    }

    const initialState = {
        round : Round(),
        selected: [],
    };
    const [state] = useState(initialState);
    const {  round,  selected} = state;


    if (!allDataLoaded) {
        return <div>Loading...</div>;
    }
    if (isAuthenticated) {

        myTeams = getTeamsForUser(user.email);
        if (myTeams.length > 0) {
            myTeam = myTeams[0]; // Set the first matching team name
        }

        myFixtures = fixtures.filter(extractFixturesByTeam(myTeam));

    }
    return (
        <div>
                {!isAuthenticated && (
                    <>

                        <h1>Welcome</h1>

                        <p>This is the new application to help you manage your team(S).</p>

                        <p>From June 2024 you will need to login to use this App. </p>


                        <img src={rego} className="rego-image" alt="Registration Instructions" />
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
                                    <FixtureDropdown fixtures={fixtures} team={myTeam} />
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
