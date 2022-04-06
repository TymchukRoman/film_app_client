import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

    return <Navbar bg="light" variant="light">
        <Container>
            <Navbar.Brand as={Link} to="/">
                Home
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/movies">
                    Movies
                </Nav.Link >
                <Nav.Link as={Link} to="/profile">
                    Profile
                </Nav.Link>
            </Nav>
        </Container>
    </Navbar>
}

export default Header;