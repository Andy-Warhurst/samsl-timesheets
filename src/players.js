import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AllPlayers from "./Players.json";

function Players() {

    async function addPlayers() {
        const records = AllPlayers;

        for (let i = 0; i < records.length; i++) {
            const id = records[i].id.toString();
            const name = records[i].name;
            const team = records[i].team;

            try {
                const response =
                    await axios.put(`https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/players`,
                        {id,name,team });
                console.lg(response.data.toString());
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div className="players-page">
            <Button
            variant="primary"
            style={{fontSize: 12}}
            onClick={() => addPlayers()}
        >
            Add
        </Button>

        </div>
    );
}

export default Players;
