import React from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import './Styles.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Selector from "./Selector";
import PrintTeamsheet from "./PrintTeamsheet";
import Guests from "./Guests";
//import FixtureDropdown from "./FixtureDropdown";
//import {getFixtures, getNextFixture} from "./Fixtures";
import {useData} from './DataContext';

function MyTeam( {round, selected, fixtures}) {

    const { data} = useData();

    return (

        <div>
            <Container>
                <Row>
                    <Col>
                        <h3>Players</h3>
                        <div style={{padding: 4}}>
                            <Selector
                                round={round}
                                team={data.theTeamName}
                                fixtures={fixtures}
                            />
                        </div>
                    </Col>
                    <Col>
                        <h3>Guests</h3>
                        <Guests/>
                        <hr/>
                        <PrintTeamsheet selected={selected}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default MyTeam;
