import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import General from "../General/General";
import Header from "../Header/Header";
import routes from './routes';

const RootRouter = () => {
    return (
        <Router>
            <Header />

            <Routes >
                {routes.map((route) => {
                    return <Route path={route.path} exact={route.exact} element={route.component} key={route.path} />
                })}
            </Routes >

        </Router>
    );
}

export default RootRouter;