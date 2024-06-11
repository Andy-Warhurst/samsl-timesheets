import React from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import './Styles.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Selector from "./Selector";
import PrintTeamsheet from "./PrintTeamsheet";
import Guests from "./Guests";
//import {getFixtures, getNextFixture} from "./Fixtures";
//import {useData} from './DataContext';

function MyTeam( {teamName, round, selected, fixtures}) {
    //const { user } = useAuth0();


    // const nextFixture = getNextFixture(getFixtures(teamName));
    //
    // if (typeof nextFixture === 'undefined') {
    //     console.log("The function returned undefined.");
    //     nextFixture.hometeam = "";
    //     nextFixture.awayteam = "";
    // }


    //const { data } = useData();

    return (

        <div>
            {/*{ fixtures && (*/}
            {/*<div>*/}
            {/*    <h1>Fixtures: {fixtures.length}</h1>*/}
            {/*</div> )}*/}
            <h1>{teamName}</h1>
            <Container>
                <Row>
                    <Col>
                        <h3>Players</h3>
                        <div style={{padding: 4}}>
                            <Selector
                                round={round}
                                team={teamName}
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

}

export default MyTeam;
