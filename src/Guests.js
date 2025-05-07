import React, { useState, useEffect, useCallback } from "react";
import "./Guests.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useData } from "./DataContext";
import { useGuests } from './GuestContext';

function Guests() {

    const { guests, deleteGuest, addGuest, updateGuest } = useGuests();
    const [myGuests, setMyGuests] = useState([]);
    const [guestText, setGuestText] = useState('');
    const { data, updateUserField } = useData();

    useEffect(() => {
        setMyGuests(guests.filter(guest => guest.team === data.theTeamName).sort((a, b) => a.name.localeCompare(b.name)));
    }, [guests, data.theTeamName]);

    const updateSelected = useCallback((selection) => {
        const updatedSelections = data.selectedPlayers.includes(selection)
            ? data.selectedPlayers.filter(player => player !== selection)
            : [...data.selectedPlayers, selection];

        updateUserField('selectedPlayers', updatedSelections);
    }, [data.selectedPlayers, updateUserField]);

    const updateShirtNumber = useCallback((guest, number) => {
        updateGuest({ ...guest, shirtno: number });
    },[updateGuest]);  //

    // const nextId = useCallback(() => {
    //     const ids = guests.map(item => item.id);
    //     const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    //     return (maxId + 1).toString();
    // }, [guests]);

    const deleteGuestById = useCallback(async (id) => {
        await deleteGuest(id);
        setMyGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
    }, [deleteGuest]);

    const addNewGuest = useCallback(async (name, team, shirtno) => {
        try {
            // const theId = nextId();
            const theId = crypto.randomUUID().toString();
            const newGuest = { id: theId, name, team, shirtno };
            setMyGuests(prevGuests => [...prevGuests, newGuest]);
            await addGuest(newGuest);
        } catch (error) {
            console.error(error);
        }
    }, [addGuest]);


    return (
        <div className="guest-page">
            <table>
                <tbody>

                { (myGuests.length !== 0) ?

                <tr>
                    <td>
                        <table className="guest-selector-table">
                            <tbody>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Shirt</th>
                            </tr>
                            {myGuests.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <input
                                            className="guest-checkbox"
                                            type="checkbox"
                                            id={"gplaying" + p.id}
                                            size="20"
                                            onClick={() => updateSelected(p)}
                                        />
                                    </td>
                                    <td className="guest-name" align='left' id={"gname" + p.id}>{p.name}</td>
                                    <td width='50'>
                                        <FormControl
                                            className="guest-shirt"
                                            id={"gshirtnumber" + p.id}
                                            name={"gshirtnumber" + p.id}
                                            type="text"
                                            value={p.shirtno}
                                            onChange={(e) => updateShirtNumber(p, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            id={"gdelete" + p.id}
                                            style={{ fontSize: 12 }}
                                            onClick={() => deleteGuestById(p.id)}
                                        >
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
                    : <tr><td><h4>No Guests</h4></td></tr>}
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
                                    style={{ fontSize: 12 }}
                                    value={guestText}
                                    onChange={(e) => setGuestText(e.target.value)}
                                />
                                <Button
                                    variant="primary"
                                    style={{ fontSize: 12 }}
                                    onClick={() => addNewGuest(guestText, data.theTeamName, '')}
                                >
                                    Add
                                </Button>
                            </InputGroup>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Guests;
