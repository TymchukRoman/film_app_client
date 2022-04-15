import React, { useState } from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {

    //eslint-disable-next-line
    const [collapsed, setCollapsed] = useState(true);

    return <>
        <Navbar bg="light" variant="light" expand={collapsed}>
            {collapsed
                ? <NavCollapsed user={props.profile.user} />
                : <NavExpanded user={props.profile.user} />
            }
        </Navbar >
        {/* <button onClick={() => setCollapsed(collapsed === true ? false : true)} ></button> */}
    </>
}

const NavCollapsed = ({ user }) => {
    return <Container fluid>
        <Navbar.Brand as={Link} to="/">
            Home
        </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">
                Movies
            </Nav.Link >
        </Nav>
        <Navbar.Text className="justify-content-end">
            {user
                ? <Nav.Link as={Link} to="/profile">
                    {user.name}
                </Nav.Link>
                : <Nav.Link as={Link} to="/auth">
                    Auth
                </Nav.Link>
            }
        </Navbar.Text>
    </Container>
}

const NavExpanded = ({ user }) => {
    return <Container fluid>
        <Navbar.Brand as={Link} to="/">
            Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/movies">
                        Movies
                    </Nav.Link >
                    <Nav.Link as={Link} to="/profile">
                        Profile
                    </Nav.Link>
                </Nav>
                <Navbar.Text>
                    {user
                        ? <Nav.Link as={Link} to="/profile">
                            {user.name}
                        </Nav.Link>
                        : <Nav.Link as={Link} to="/auth">
                            Auth
                        </Nav.Link>
                    }
                </Navbar.Text>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
    </Container>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})

export default connect(mapStateToProps, {})(Header);