import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../store/reducers/user.reducer";

const Profile = (props) => {

    const logout = () => {
        localStorage.removeItem('auth_token');
        props.logoutUser();
    }

    return <div>
        {!props.profile.user && <Navigate to="/auth" />}
        <Button onClick={logout}>Logout</Button>
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, { logoutUser })(Profile)