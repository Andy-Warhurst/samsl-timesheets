import React, { useState, useEffect, useCallback } from "react";
import "./Guests.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useData } from "./DataContext";
import { useGuests } from './GuestContext';

function Guests() {

    const { guests, deleteGuest, addGuest, updateGuest } = useGuests();
    const [myGuests, setMyGuests] = useState([]);
    const [guestText, setGuestText] = useState('');
    const [columns, setColumns] = useState(5);
    const [columnWidth, setColumnWidth] = useState(100);
    const { data, updateUserField } = useData();

    useEffect(() => {
        setMyGuests(guests.filter(guest => guest.team === data.theTeamName).sort((a, b) => a.name.localeCompare(b.name)));
    }, [guests, data.theTeamName]);

    const updateSelected = useCallback((player) => {
        const isAlreadySelected = data.selectedPlayers.some(p => p.id === player.id);

        const updatedSelections = isAlreadySelected
            ? data.selectedPlayers.filter(p => p.id !== player.id)
            : [...data.selectedPlayers, player];

        updateUserField('selectedPlayers', updatedSelections);
    }, [data.selectedPlayers, updateUserField]);


    const updateShirtNumber = useCallback((guest, number) => {
        updateGuest({ ...guest, shirtno: number });
    },[updateGuest]);  //


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


    useEffect(() => {
        const updateColumns = () => {
            // tweak breakpoint as you like (e.g. 768, 576, etc.)
            if (window.innerWidth < 768) {
                setColumns(3);
            } else {
                setColumns(6);
            }
            setColumnWidth((window.innerWidth / columns) - (columns * 10));
        };

        updateColumns(); // run once on mount
        window.addEventListener("resize", updateColumns);

        return () => window.removeEventListener("resize", updateColumns);
    });


    return (
        <div className="guest-page">
            <table className="guest-selector-table">
                <tbody>
                {Array.from(
                    { length: Math.ceil(myGuests.length / 5) },  // number of rows
                    (_, rowIndex) => (
                        <tr key={rowIndex}>
                            {myGuests
                                .slice(rowIndex * columns, rowIndex * columns + columns)   // up to 5 guests per row
                                .map(p => {
                                    const isSelected = data.selectedPlayers.some(sp => sp.id === p.id);

                                    return (
                                        <td key={p.id}>
                                            <Card
                                                style={{
                                                    width: columnWidth,
                                                    height: "100px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: 4,
                                                    backgroundColor: "blue"
                                                }}
                                            >
                                                <Button
                                                    variant={isSelected ? "success" : "primary"}
                                                    id={"gplaying" + p.id}
                                                    style={{ fontSize: 10,
                                                        width: columnWidth,
                                                        marginBottom: 4 }}
                                                    onClick={() => updateSelected(p)}
                                                >
                                                    {p.name}
                                                </Button>
                                                <div style={{ display: "flex", width: "100%", gap: "4px", marginTop: "4px" }}>

                                                    <FormControl
                                                        className="guest-shirt"
                                                        id={"gshirtnumber" + p.id}
                                                        name={"gshirtnumber" + p.id}
                                                        style={{ fontSize: "xx-small", marginBottom: 4 }}
                                                        type="text"
                                                        value={p.shirtno}
                                                        onChange={(e) => updateShirtNumber(p, e.target.value)}
                                                    />

                                                    <Button
                                                        variant="primary"
                                                        id={"gdelete" + p.id}
                                                        style={{ fontSize: "xx-small",
                                                            margin: "1px",
                                                            backgroundColor: "darkred"
                                                        }}
                                                        onClick={() => deleteGuestById(p.id)}
                                                    >
                                                        X
                                                    </Button>
                                                </div>
                                            </Card>
                                        </td>
                                    );
                                })}
                        </tr>
                    )
                ) }

                </tbody>

            </table>
            <table>
                <tbody>
                <tr>
                    <td style={{
                        width: "200px"}}>
                        <div>
                            <label htmlFor="guestname">Name:</label>
                            <InputGroup>
                                <FormControl
                                    placeholder="Guest's Name"
                                    aria-label="Guest's Name"
                                    aria-describedby="basic-addon2"
                                    id="guestname"
                                    style={{
                                        fontSize: 12,
                                        width: "100px"}}
                                    value={guestText}
                                    onChange={(e) => setGuestText(e.target.value)} />
                                <Button
                                    variant="primary"
                                    style={{ fontSize: 12 }}
                                    onClick={() => addNewGuest(guestText, data.theTeamName, '')} >
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
