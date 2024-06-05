import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";
// import Teams from "./TeamData.json";
import Round from "./Round";
import GUESTS from "./GuestList.json";
import {useReducer} from "react";
import reducer from "./Reducer";
import PLAYERS from "./Players.json";
import {extractFixturesByTeam, getFixtures} from "./Fixtures";
import axios from "axios";

function Home() {
    const { isAuthenticated } = useAuth0();

    const [myState, setState] =
        React.useState({items: [], DetailsLoaded: false })
    const {DetailsLoaded, items} = myState;

    //let reloadUserTeamsRequired = true;
    let reloadPlayersRequired = true;

    // let teamId = 16;



    // if (reloadUserTeamsRequired === true) {
    //     axios.get(
    //         "https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/user-team"
    //     )
    //         .then((res) => {
    //             setState({
    //                 userTeams: res.data,
    //                 userDL: true,
    //             });
    //
    //             //dispatch({type: 'CHANGE_TEAM', payload: items});
    //             reloadUserTeamsRequired = false;
    //         });
    // }


    // let userTeams;
    //
    // axios.get('https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/user-team'  )
    //     .then(function (response) {
    //         // handle success
    //         userTeams = response.data;
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         userTeams = {id:0,email:"andy@andywarhurst.co.uk", team: "Adelaide Spurs"};
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         // always executed
    //     });

    // const myItem = items.find(item => item.email === "andy@andywarhurst.co.uk");
    //
    // console.log(myItem);
    //
    // const myTeam = items.find(item => item.email === "andy@andywarhurst.co.uk").team;
    // //const myTeam = Teams[teamId - 1].name;

    const myTeam = "University Old Boys";

    let myFixtures = getFixtures();
    myFixtures = myFixtures.filter(extractFixturesByTeam(myTeam));


    const initialState = {
        user: "",
        teamName: myTeam,
        round : Round(),
        players: PLAYERS,
        selected: [],
        guests: GUESTS,
        fixtures: myFixtures , // myFixtures
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const {user, teamName, round, players, selected, guests, fixtures} = state;


    if (reloadPlayersRequired === true) {
      axios.get(
          "https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/players", {timeout: 5000}
      )
          .then((res) => {
            setState({
              items: res.data.filter(extractPlayersByTeam),
              DetailsLoaded: true,
            });

            dispatch({type: 'CHANGE_PLAYERS', payload: items});
              reloadPlayersRequired = false;
          });
    }
    if (!DetailsLoaded)
      return (
          <div>
            <h1> Please wait.... </h1>
          </div>
      );
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
                            fixtures={fixtures}
                            dispatch={dispatch}
                        />
                    </>
                )}

        </div>
    );

    function extractPlayersByTeam(plr) {
        return plr.team === myTeam;
    }

}

export default Home;
