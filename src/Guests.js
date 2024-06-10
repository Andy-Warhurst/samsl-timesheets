import React, {useState} from "react";
import "./Guests.css";
//import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
//import UserContext from "./UserContext";
import {useData} from "./DataContext";
import { useGuests } from './GuestContext';

function Guests({team}) {

    const {  guests, deleteGuest, addGuest, updateGuest } = useGuests();

    const [myGuests, setMyGuests] = useState(guests);

    // const [myGuestState, setMyGuestState] =
    //     useState({GuestsLoaded: false, guestList: []});

    const [guestText, setGuestText] = useState('');

    //const { data, updateUserField } = useContext(UserContext);
    const { data, updateUserField } = useData();

    function updateSelected (selection) {

        var updatedSelections = [];
        updatedSelections = updatedSelections.concat(data.selectedPlayers);

        if (!updatedSelections.includes(selection)) {
            updatedSelections.push(selection);
        } else {
            var index = updatedSelections.indexOf(selection);
            updatedSelections.splice(index, 1);
        }

        updateUserField('selectedPlayers', updatedSelections);
    }

    function updateShirtNumber(guest, number) {
        guest.shirtno = number;

        updateGuest({id: guest.id, name: guest.name, team: guest.team, shirtno: guest.shirtno});

    }

    function extractPlayersByTeam(plr) {
        return plr.team === team;
    }

    function nextId() {
        const ids = myGuests.map(item => item.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return (maxId + 1) + '';
    }

    async function deleteGuestById(id) {

        deleteGuest(id);
        let index = myGuests.findIndex(element => element.id === id);
        myGuests.splice(index, 1);
        setMyGuests(myGuests);

    }


    async function addNewGuest(name, team, shirtno) {
        try {
            const theId = nextId();
            myGuests.push({ id: theId, name, team, shirtno });
            setMyGuests(myGuests);
            addGuest({id: theId, name: name, team: team, shirtno: shirtno});
        } catch (error) {
            console.error(error);
        }
    };

    if (myGuests.length === 0) {
        return (
            <div>
                <table>
                    <tr>
                        <td>
                            <div>
                                <label htmlFor="guestname">Name:</label>
                                <InputGroup>
                                    <FormControl
                                        placeholder="Guest's Name"
                                        aria-label="Guest's Name"
                                        aria-describedby="basic-addon2"
                                        id="guestname"
                                        style={{fontSize: 12}}
                                        onChange={(e) => setGuestText(e.target.value)}
                                    />
                                    <Button
                                        variant="primary"
                                        style={{fontSize: 12}}
                                        onClick={() => addGuest(guestText, team)}
                                    >
                                        Add
                                    </Button>
                                </InputGroup>
                            </div>

                        </td>
                    </tr>
                </table>
            </div>
        )
    }
    return (
        <div className="guest-page">
            {/*<Container>*/}
            <table>
                <tr>
                    <td>
                        <table className="guest-selector-table">
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Shirt</th>
                            </tr>
                            {myGuests.filter(extractPlayersByTeam).map(p => (
                                <tr>
                                    <td>
                                        <input
                                            className="guest-checkbox"
                                            type="checkbox"
                                            id={"gplaying".concat(p.id)}
                                            size="20"
                                            onClick={() => updateSelected(p)}
                                        />
                                    </td>
                                    <td className="guest-name" align='left' id={"gname".concat(p.id)}>{p.name}</td>
                                    <td width='50'>
                                        <FormControl
                                            className={"guest-shirt"}
                                            id={"gshirtnumber".concat(p.id)}
                                            name={"gshirtnumber".concat(p.id)}
                                            type="text"
                                            value={p.shirtno}
                                            onChange={(e) => updateShirtNumber(p, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            id={"gdelete".concat(p.id)}
                                            style={{fontSize: 12}}
                                            onClick={() => deleteGuestById(p.id)}
                                        >
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </table>

                    </td>
                </tr>

                <tr>
                    <td>
                        <div>
                            <label htmlFor="guestname">Name:</label>
                            <InputGroup>
                                <FormControl
                                    placeholder="Guest's Name"
                                    aria-label="Guest's Name"
                                    aria-describedby="basic-addon2"
                                    id="guestname"
                                    style={{fontSize: 12}}
                                    onChange={(e) => setGuestText(e.target.value)}
                                />
                                <Button
                                    variant="primary"
                                    style={{fontSize: 12}}
                                    onClick={() => addNewGuest(guestText, "University Old Boys", "")}
                                >
                                    Add
                                </Button>
                            </InputGroup>
                        </div>

                    </td>
                </tr>
            </table>

        </div>
    );
}

export default Guests;
