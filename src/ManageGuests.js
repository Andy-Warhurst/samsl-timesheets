import React, { useState } from "react";
//import GUESTS from "./GuestList.json";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const ManageGuests = ({ team, guests, dispatch }) => {

  const [latestGuest, setLatestGuest] = useState(1);

  function addGuest(name) {
    let guestCount = "Guest-" + latestGuest;
    const newGuests = {
      id: guestCount,
      name: name,
      team: team,
      dateofbirth: "10/08/1967",
      status: "Active",
      regotype: "Guest",
      games: 0,
    };

    setLatestGuest(latestGuest + 1);

    let allGuests = [];
    allGuests = allGuests.concat(guests);

    allGuests[allGuests.length] = newGuests;
    //GUESTS[GUESTS.length] = newGuests;    // Possibly unmutable

    dispatch({ type: "CHANGE_GUESTS", payload: allGuests });
  }

  return (
    <div>
      <h3>Guests</h3>
      <label htmlFor="guestname">Name:</label>
      <InputGroup>
        <FormControl
          placeholder="Guest's Name"
          aria-label="Guest's Name"
          aria-describedby="basic-addon2"
          id="guestname"
          style={{fontSize: 12}}
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            style={{fontSize: 12}}
            // eslint-disable-next-line no-undef
            onClick={() => addGuest(guestname.value)}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default ManageGuests;
