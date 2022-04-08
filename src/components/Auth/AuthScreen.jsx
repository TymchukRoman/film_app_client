import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Login from "./Login";
import Singup from "./Signup";
import { setLoginedUser } from "../../store/reducers/user.reducer";
import { Navigate } from "react-router-dom";

const AuthScreen = (props) => {

    const [mode, setMode] = useState(null);

    const switchMode = () => setMode(mode === 'login' ? 'signup' : 'login');

    return <div style={{ width: '100%' }}>
        {props.profile.user && <Navigate to='/profile' />}
        {mode === null
            ? <div >
                <Row className="justify-content-md-center">
                    <Col xs lg="5">
                        <Button variant="outline-dark" onClick={() => { setMode('login') }} style={{ width: "45%", marginLeft: "20%", marginTop: "3rem", height: "15rem" }}>
                            Login
                        </Button>
                    </Col>
                    <Col xs lg="5">
                        <Button variant="outline-dark" onClick={() => { setMode('signup') }} style={{ width: "45%", marginLeft: "20%", marginTop: "3rem", height: "15rem" }}>
                            Sing Up
                        </Button>
                    </Col>
                </Row>
            </div>
            : mode === "login"
                ? <Login switchMode={switchMode} setLoginedUser={props.setLoginedUser} />
                : <Singup switchMode={switchMode} setLoginedUser={props.setLoginedUser} />
        }
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, { setLoginedUser })(AuthScreen)