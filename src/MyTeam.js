import React, {useContext} from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import './Styles.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Selector from "./Selector";
import PrintTeamsheet from "./PrintTeamsheet";
import Guests from "./Guests";
//import {getFixtures, getNextFixture} from "./Fixtures";
import UserContext from './UserContext';

function MyTeam( {user, teamName, round, players, selected, guests, fixtures, dispatch}) {
    //const { user } = useAuth0();

    const myPlayers = players.filter(extractPlayersByTeam).sort((a, b) => a.name > b.name);
    const myGuests = guests.filter(extractPlayersByTeam).sort((a, b) => a.name > b.name);

    console.log("A fixture: ", fixtures[7]);

    // const nextFixture = getNextFixture(getFixtures(teamName));
    //
    // if (typeof nextFixture === 'undefined') {
    //     console.log("The function returned undefined.");
    //     nextFixture.hometeam = "";
    //     nextFixture.awayteam = "";
    // }


    const { data } = useContext(UserContext);

    return (

        <div>


                    <div>
                        <h1>{data.usernamename}</h1>
                    </div>
            <h1>{teamName}</h1>

            <Container>
                <Row>
                    <Col>
                        <h3>Players</h3>
                        <div style={{padding: 4}}>
                            <Selector
                                round={round}
                                team={teamName}
                                guests={myGuests}
                                dispatch={dispatch}
                                players={myPlayers}
                                fixtures={fixtures}
                            />
                        </div>
                    </Col>
                    <Col>
                        <h3>Guests</h3>
                        <Guests
                            team={teamName}
                        />
                        <hr/>
                        <PrintTeamsheet selected={selected}/>
                    </Col>
                </Row>

            </Container>
        </div>

    );

    function extractPlayersByTeam(plr) {
        return plr.team === teamName;
    }

};

export default MyTeam;
