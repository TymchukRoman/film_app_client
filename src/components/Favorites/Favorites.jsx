import React, { useEffect, useState } from "react";
import { getFavorites } from "../../api/userAPI";
import { Row, Col, Card } from "react-bootstrap";
import ImageComponent from "../helpers/ImageComponent";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Preloader from "../helpers/Preloader";
import EmptyState from "../helpers/EmptyState";

const Favorites = (props) => {

    const [movies, setMovies] = useState([]);
    const [isLoaded, setISLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        getFavorites(token).then((response) => {
            if (response?.data?.movies?.length) {
                setMovies(response.data.movies);
            }
            setISLoaded(true)
        })
    }, []);

    return <div>
        {!props.profile.user && <Navigate to='/auth' />}
        {isLoaded
            ? <>
                {movies.length
                    ? <>
                        <Row xs={1} md={5} style={{ padding: "20px" }}>
                            {movies.map((movie) => {
                                return <Col key={movie._id} as={Link} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'black', marginTop: "20px" }}>
                                    <Card className={'h-100'}>
                                        <ImageComponent image={movie.poster} />
                                        <Card.Body >
                                            <p>{movie.title}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                    </>
                    : <EmptyState message={"You don`t add movies to favorite yet"} />
                }
            </>
            : <Preloader />
        }
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, {})(Favorites);
