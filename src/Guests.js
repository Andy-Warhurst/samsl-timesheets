import React, {useState} from "react";
import "./Guests.css";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function Guests({team, selected, dispatch}) {

    const [myState, setState] = React.useState({items: [], DetailsLoaded: false})
    const {DetailsLoaded, items} = myState;
    const [guestText, setGuestText] = useState('');

    let reloadRequired = true;

    function updateSelected(selection) {

        var updatedSelections = [];
        updatedSelections = updatedSelections.concat(selected);

        if (!updatedSelections.includes(selection)) {
            // updatedSelections[updatedSelections.length] = selection;
            updatedSelections.push(selection);
        } else {
            var index = updatedSelections.indexOf(selection);
            updatedSelections.splice(index, 1);
        }

        dispatch({type: 'CHANGE_SELECTED', payload: updatedSelections});

    }


    function updateShirtNumber(guest, number) {
        guest.shirtno = number;

    }

    function extractPlayersByTeam(plr) {
        return plr.team === team;
    }

    function nextId() {
        const ids = myState.items.map(item => item.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return (maxId + 1) + '';
    }


    async function addGuest(name, team) {
        try {
            const response =
                await axios.put(`https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/items`,
                    {id: nextId(), name: name, team: team});
            reloadRequired = true;
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    async function deleteGuest(id) {
        try {
            const response =
                await axios.delete(`https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/items/${id}`);
            reloadRequired = true;
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }

    if (reloadRequired === true) {
        axios.get(
            "https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/items"
        )
            .then((res) => {
                setState({
                    items: res.data.filter(extractPlayersByTeam),
                    DetailsLoaded: true,
                });
                reloadRequired = false;
            });
    }
    if (!DetailsLoaded)
        return (
            <div>
                <h1> Please wait.... </h1>
            </div>
        );
    if (items.length === 0) {
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
                            {items.map(p => (
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
                                            onChange={(e) => updateShirtNumber(p, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            id={"gdelete".concat(p.id)}
                                            style={{fontSize: 12}}
                                            onClick={() => deleteGuest(p.id)}
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
                                    onClick={() => addGuest(guestText, "University Old Boys")}
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
