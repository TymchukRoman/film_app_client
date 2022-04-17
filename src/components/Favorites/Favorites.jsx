import React, { useEffect, useState } from "react";
import { getFavorites } from "../../api/userAPI";
import { Row, Col, Card } from "react-bootstrap";
import ImageComponent from "../helpers/imageComponent";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Favorites = (props) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        getFavorites(token).then((response) => {
            if (response?.data?.movies?.length) {
                setMovies(response.data.movies);
            }
        })
    }, []);

    return <div>
        {!props.profile.user && <Navigate to='/auth' />}
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
            : <p>You don`t have any favorite movies</p>
        }
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, {})(Favorites);
