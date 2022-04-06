import React, { useState } from "react";
import { Container, Navbar, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

    const [collapsed, setCollapsed] = useState(true);

    return <Navbar bg="light" variant="light" expand={collapsed}>
        {collapsed
            ? <Container fluid>

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
            : <Container fluid>
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
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        }

    </Navbar >
}

export default Header;