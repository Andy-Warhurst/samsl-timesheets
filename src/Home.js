import {useAuth0} from "@auth0/auth0-react";
import * as React from "react";
import MyTeam from "./MyTeam";

function Home() {
    const { isAuthenticated } = useAuth0();

    return (
        <div>

            <header></header>

                {!isAuthenticated && (
                    <>
                        <p>Please Login to use this App.</p>

                    </>
                )}
                {isAuthenticated && (
                    <>

                        <MyTeam />
                    </>
                )}

        </div>
    );
}

export default Home;
