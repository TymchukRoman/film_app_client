import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Header from "../Header/Header";
import routes from './routes';
import { Navigate } from "react-router-dom";

const RootRouter = (props) => {

    const isRedirectionNeeded = () => {
        if (props.toLoginRedirect) {
            props.setLoginRedirect(false);
            return <Navigate to={"/auth"} />;
        } else {
            return <></>;
        }
    }

    return (
        <Router>

            <Header />

            <Routes>
                {routes.map((route) => {
                    return <Route path={route.path} exact={route.exact} element={route.component} key={route.path} />
                })}
            </Routes>

            {isRedirectionNeeded()}

        </Router>
    );
}

export default RootRouter;