import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, ButtonGroup, ButtonToolbar, InputGroup, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../store/reducers/user.reducer";
import ImageComponent from "../helpers/ImageComponent";
import { Link } from "react-router-dom";
import { getManyMovies } from "../../api/movieAPI";
import { getFavorites } from "../../api/userAPI";
import Preloader from "../helpers/Preloader";
import EmptyState from "../helpers/EmptyState";

const Profile = (props) => {

    const [lastViews, setLastViews] = useState(null);
    const [favorites, setFavorites] = useState(null);

    useEffect(() => {

        const userId = localStorage.getItem('currentUser');
        let lasts = JSON.parse(localStorage.getItem(`${userId}lastViews`));
        getManyMovies(lasts).then((response) => {
            if (response.data?.movies) {
                setLastViews(response.data.movies);
            } else {
                setLastViews([]);
            }
        });
        const token = localStorage.getItem('auth_token');
        getFavorites(token, 5).then((response) => {
            if (response.data?.movies) {
                setFavorites(response.data.movies);
            } else {
                setFavorites([]);
            }
        });
    }, [])

    const logout = () => {
        localStorage.removeItem('auth_token');
        props.logoutUser();
    }

    return <div style={{ padding: "20px" }}>
        {!props.profile?.user && <Navigate to="/auth" />}

        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
            <InputGroup>
                <InputGroup.Text id="btnGroupAddon">{`Logged in as ${props.profile?.user?.name}`}</InputGroup.Text>
            </InputGroup>
            <ButtonGroup className="me-2" style={{ marginLeft: "20px" }}>
                <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
            </ButtonGroup >
        </ButtonToolbar>
        <Container style={{ width: "100%" }}>
            <Row> <h1> Last visited </h1> </Row>
            {lastViews
                ? <> {lastViews.length
                    ? <Row md={5}>
                        {lastViews.map(movie => {
                            return <Col key={movie._id} as={Link} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'black', marginTop: "20px" }}>
                                <Card className={'text-center'}>
                                    <ImageComponent image={movie.poster} />
                                    <Card.Body >
                                        <p title={`${movie.title} (${movie.year})`}>
                                            {movie.title.length > 20 ? `${movie.title.slice(0, 20)}... ` : `${movie.title} `}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        })}
                    </Row>
                    : <EmptyState message={"You don`t visit any movie"} />
                }
                </>
                : <Preloader />
            }
            <Row style={{ marginTop: "20px" }}>
                <Col className="col-10">
                    <h1> Favorites </h1>
                </Col>
                <Col className="text-center">
                    <Button variant="outline-dark" as={Link} to='/favorites' style={{ marginTop: "10px" }}>More...</Button>
                </Col>
            </Row>
            {favorites
                ? <>
                    {favorites.length
                        ? <Row md={5}>
                            {favorites.map(movie => {
                                return <Col key={movie._id} as={Link} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'black', marginTop: "20px" }}>
                                    <Card className={'text-center'}>
                                        <ImageComponent image={movie.poster} />
                                        <Card.Body >
                                            <p title={`${movie.title} (${movie.year})`}>
                                                {movie.title.length > 20 ? `${movie.title.slice(0, 20)}... ` : `${movie.title} `}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                        : <EmptyState message={"You don`t add movies to favorite yet"} />
                    }
                </>
                : <Preloader />
            }

        </Container >
    </div >
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, { logoutUser })(Profile)