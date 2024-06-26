import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
//import { PageLoader } from "./page-loader";
import Services from "./Services";

export const AuthenticationGuard = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                {/*<PageLoader />*/}
                <Services />
            </div>
        ),
    });

    return <Component />;
};

export default AuthenticationGuard;
