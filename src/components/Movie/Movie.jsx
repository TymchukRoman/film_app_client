import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/movieAPI";
import { Container, Row, Col, Card, Badge, Form, Button } from "react-bootstrap";
import { getComments, newComment } from "../../api/commentsAPI";
import { useFormik } from "formik";
import { editFavorite } from "../../api/userAPI";
import ImageComponent from "../helpers/imageComponent";
import Preloader from "../helpers/Preloader";
import EmptyState from "../helpers/EmptyState";

const Movie = (props) => {

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const [moreExpanded, setMoreExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(true);
    const [isCommentLoading, setIsCommentLoading] = useState(false);


    useEffect(() => {
        setIsFavorite(props.profile?.user?.favorites?.includes(movieId));

        let lastViews = localStorage.getItem('lastViews');
        if (!lastViews) {
            lastViews = [movieId];
        } else {
            try {
                lastViews = JSON.parse(lastViews);
                if (lastViews.includes(movieId)) {
                    lastViews = lastViews.filter(item => item !== movieId);
                    lastViews.unshift(movieId);
                } else {
                    lastViews = [movieId, ...lastViews.slice(0, 4)];
                }
            } catch (e) {
                lastViews = [movieId];
            }
        }
        localStorage.setItem('lastViews', JSON.stringify(lastViews));

        //eslint-disable-next-line
    }, [])

    const switchFavorite = () => {

        const token = localStorage.getItem('auth_token');

        if (!token) return false;

        if (isFavorite) {
            setIsFavorite(false);
            editFavorite(token, 'remove', movieId);
        } else {
            setIsFavorite(true);
            editFavorite(token, 'add', movieId);
        }
    }

    const minToHour = (mins) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins - hours * 60;
        return `${hours ? `${hours}h ` : ''}${minutes}m`
    }

    useEffect(() => {
        if (movieId) {
            getMovie(movieId).then(response => {
                setMovie(response.data.movie);
            });
            getComments(movieId).then(response => {
                setComments(response.data.comments.sort((a, b) => new Date(b.date) - new Date(a.date)));
            })
        } else {

        }
    }, [movieId])

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        onSubmit: (values, { resetForm }) => {
            setIsCommentLoading(true);
            newComment(movieId, values.comment).then((response) => {
                if (response?.data?.error) {
                    alert(JSON.stringify(response.data.error));
                } else {
                    getComments(movieId).then(response => {
                        setComments(response.data.comments.sort((a, b) => new Date(b.date) - new Date(a.date)));
                        resetForm({});
                    })
                }
                setIsCommentLoading(false);
            })
        },
    });

    return <div style={{ marginTop: '20px' }}   >
        {movie
            ? <Container>
                <Row>
                    <Col>
                        <Card>
                            <ImageComponent image={movie.poster} />
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <Container>
                            <Row>
                                <Col xs={6}>
                                    <h4>
                                        {movie.title}
                                        <Badge
                                            bg="light"
                                            text="dark"
                                            pill
                                            style={{ marginLeft: "20px", marginBottom: "2px" }}
                                            title={movie.released}
                                        >
                                            {movie.year}
                                        </Badge>
                                    </h4>
                                </Col>
                                <Col>
                                    <Button
                                        variant="warning"
                                        style={{ marginLeft: "20px" }}
                                        title={movie.imdb.votes ? `${movie.imdb.votes} votes` : ''}
                                    >
                                        {movie.imdb.rating ? `${movie.imdb.rating} on IMDB` : 'Not rated'}

                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant={isFavorite ? 'danger' : 'outline-danger'} onClick={switchFavorite}>{isFavorite ? "Remove from fav" : "Add to fav"}</Button>
                                </Col>
                            </Row>
                            <Row>
                                {moreExpanded
                                    ? <p>
                                        {movie.fullplot}{' '}
                                        {/* eslint-disable-next-line  */}
                                        <a style={{ textDecoration: 'underline' }} href="#" onClick={() => { setMoreExpanded(false) }}>
                                            Less...
                                        </a>
                                    </p>
                                    : <p>
                                        {movie.plot}{' '}
                                        {/* eslint-disable-next-line  */}
                                        <a style={{ textDecoration: 'underline' }} href="#" onClick={() => { setMoreExpanded(true) }}>
                                            More...
                                        </a>
                                    </p>
                                }
                            </Row>
                            {movie.cast?.length > 0 &&
                                <Row>
                                    <p>Cast: {movie.cast.map((actor, index) => <Badge key={`${actor}${index}`} bg="dark" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
                                </Row>
                            }
                            {movie.genres?.length > 0 &&
                                <Row>
                                    <p>Genres: {movie.genres.map((actor, index) => <Badge key={`${actor}${index}`} bg="success" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
                                </Row>
                            }
                            {movie.countries?.length > 0 &&
                                <Row>
                                    <p>Countries: {movie.countries.map((actor, index) => <Badge key={`${actor}${index}`} bg="info" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
                                </Row>
                            }
                            {movie.directors?.length > 0 &&
                                <Row>
                                    <p>Directors: {movie.directors.map((actor, index) => <Badge key={`${actor}${index}`} bg="danger" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
                                </Row>
                            }
                            {movie.writers?.length > 0 &&
                                <Row>
                                    <p>Writers: {movie.writers.map((actor, index) => <Badge key={`${actor}${index}`} pill bg="danger" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
                                </Row>
                            }
                            <Row>
                                <p>Runtime: {minToHour(movie.runtime)}</p>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <h4>Comments</h4>
                        </Row>
                        <Row>
                            <Form onSubmit={formik.handleSubmit} >
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                name="comment"
                                                onChange={formik.handleChange}
                                                value={formik.values.comment}
                                                disabled={isCommentLoading} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button variant="success" type="submit" disabled={isCommentLoading}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Row>
                        <Row>
                            {comments.length
                                ? <div>
                                    {comments.map((comment) => {
                                        return <Card key={comment._id} style={{ marginTop: '10px' }} className={`mb-2`} >
                                            <Card.Header>
                                                <Row>
                                                    <Col>
                                                        {comment.name}
                                                    </Col>
                                                    <Col className={'text-center text-muted'}>
                                                        {comment.date}
                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                            <Card.Body>
                                                {comment.text}
                                            </Card.Body>
                                        </Card>
                                    })}
                                </div>
                                : <EmptyState message={"No comments on this movie yet"} />
                            }
                        </Row>
                    </Col>
                </Row>
            </Container >
            : <Preloader />
        }
    </div >
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, {})(Movie)