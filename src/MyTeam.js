import React, { useReducer} from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import reducer from "./Reducer";
import './Styles.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Jumbotron from "react-bootstrap/Jumbotron";
import PrintPreview from "./PrintPreview";
//import ManageGuests from "./ManageGuests";
import Selector from "./Selector";

import GUESTS from "./GuestList.json";
import Teams from "./TeamData.json";
import Round from "./Round";
//import FixtureDetails from "./FixtureDetails";

const MyTeam = () => {
    //const { user } = useAuth0();

   // console.log("Props: ", props);

    let teamId=16;
    let theRound = Round();

    const initialState = {
        round: theRound,
        team: Teams[teamId-1].name,
        selected: [],
        guests: GUESTS.sort((a, b) => a.name > b.name),
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const { round, team, selected, guests } = state;

    return (
        // <div>
        //     <h1>MyTeam</h1>
        //     Hello {user.name} {user.email}
        //
        // </div>


        <div className="home-page">


            <h1>{team}</h1>

            <Container>
                <Row>
                    <Col md={3} >
                        <div style={{padding: 4}}>
                            <Selector
                                round={round}
                                team={team}
                                guests={guests}
                                selected={selected}
                                dispatch={dispatch}
                            />
                        </div>
                        <div>
                            {/*<ManageGuests team={team} guests={guests} dispatch={dispatch} />*/}
                        </div>
                    </Col>
                    <Col>
                        <PrintPreview round={round} team={team} selected={selected} />
                    </Col>
                </Row>
            </Container>
        </div>



    );
};

export default MyTeam;
