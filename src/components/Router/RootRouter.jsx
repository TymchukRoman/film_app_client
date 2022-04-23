import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import routes from './routes';
import { userMe } from "../../api/userAPI";
import { setLoginedUser } from "../../store/reducers/user.reducer";
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import Preloader from '../helpers/Preloader';

const RootRouter = (props) => {

    const [toLoginRedirect, setLoginRedirect] = useState(false);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const redirectToAuth = () => {
        setLoginRedirect(false);
        return <Navigate to={"/auth"} />
    }

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            setIsUserLoaded(true);
        } else {
            userMe(token).then((response) => {
                if (response?.data?.user) {
                    props.setLoginedUser(response.data.user);
                }
                setIsUserLoaded(true);
                if (response?.data?.status === 401) {
                    setLoginRedirect(true);
                }
            });
        }
        //eslint-disable-next-line
    }, [])

    return <>
        {
            isUserLoaded
                ? <Router>

                    < Header />

                    {toLoginRedirect && redirectToAuth()}

                    <Routes>
                        {routes.map((route) => {
                            return <Route path={route.path} exact={route.exact} element={route.component} key={route.path} />
                        })}
                    </Routes>


                </Router >
                : <Preloader />
        }
    </>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})

export default connect(mapStateToProps, { setLoginedUser })(RootRouter);