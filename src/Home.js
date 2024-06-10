import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
import Round from "./Round";
import GUESTS from "./GuestList.json";
import {useReducer, useState} from "react";
import PLAYERS from "./Players.json";
import {extractFixturesByTeam} from "./Fixtures";
import {useFixtures} from "./FixtureContext";
import {useData} from "./DataContext";

function Home() {
    const { isAuthenticated } = useAuth0();

    const {  data } = useData();
    const theTeams = data.userTeams;





    const myTeam = "University Old Boys";

    const { fixtures } = useFixtures();
    const myFixtures = fixtures.filter(extractFixturesByTeam(myTeam));

    const initialState = {
        user: "",
        teamName: myTeam,
        round : Round(),
        players: PLAYERS,
        selected: [],
        guests: GUESTS,
    };

    const [state, dispatch] = useState(initialState);
    const {user, teamName, round, players, selected, guests} = state;


    //PLAYERS.data.filter(extractPlayersByTeam());
    //reloadPlayersRequired = true

    // if (reloadPlayersRequired === true) {
    //   axios.get(
    //       "https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/players", {timeout: 5000}
    //   )
    //       .then((res) => {
    //         setState({
    //           items: res.data.filter(extractPlayersByTeam),
    //           DetailsLoaded: true,
    //         });
    //
    //         dispatch({type: 'CHANGE_PLAYERS', payload: items});
    //           reloadPlayersRequired = false;
    //       });
    // }
    // if (!DetailsLoaded)
    //   return (
    //       <div>
    //         <h1> Please wait.... </h1>
    //       </div>
    //   );
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
                            guests={guests}
                            fixtures={myFixtures}
                            dispatch={dispatch}
                        />
                    </>
                )}

        </div>
    );

    // function extractPlayersByTeam(plr) {
    //     return plr.team === myTeam;
    // }

}

export default Home;
