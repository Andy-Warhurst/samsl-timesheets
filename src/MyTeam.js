import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Styles.css';

const MyTeam = () => {
    const { user } = useAuth0();

    return (
        <div>
            <h1>MyTeam</h1>
            Hello {user.name} {user.email}

        </div>
    );
};

export default MyTeam;
