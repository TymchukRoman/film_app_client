import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { getMovie } from "../../api/movieAPI";
import { Container, Row, Col, Card, Badge, Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { getComments, newComment } from "../../api/commentsAPI";
import { useFormik } from "formik";
import { editFavorite } from "../../api/userAPI";
import ImageComponent from "../helpers/ImageComponent";
import Preloader from "../helpers/Preloader";
import EmptyState from "../helpers/EmptyState";
import { setParams } from "../../store/reducers/search.reducer";
import repliedIcon from '../../resourses/replied.png';

const Movie = (props) => {

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const [moreExpanded, setMoreExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(true);
    const [isCommentLoading, setIsCommentLoading] = useState(false);
    const [navigateTo, setNavigateTo] = useState(null);

    const navigateWithParams = (params) => {
        props.setParams(params);
        setNavigateTo(<Navigate to={"/movies"} />)
    }

    useEffect(() => {
        setIsFavorite(props.profile?.user?.favorites?.includes(movieId));
        const userId = localStorage.getItem('currentUser');
        let lastViews = localStorage.getItem(`${userId}lastViews`);
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
        localStorage.setItem(`${userId}lastViews`, JSON.stringify(lastViews));

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
        {navigateTo ? navigateTo : <></>}
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
                                            onClick={() => { navigateWithParams({ year: { from: movie.year, to: movie.year } }) }}
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
                                    <p>
                                        Cast: {movie.cast.map((actor, index) =>
                                            <Badge
                                                onClick={() => { navigateWithParams({ actors: [actor] }) }}
                                                key={`${actor}${index}`}
                                                bg="dark"
                                                style={{ marginLeft: "20px" }}>
                                                {actor}
                                            </Badge>)}
                                    </p>
                                </Row>
                            }
                            {movie.genres?.length > 0 &&
                                <Row>
                                    <p>
                                        Genres: {movie.genres.map((genre, index) =>
                                            <Badge
                                                onClick={() => { navigateWithParams({ genres: [genre] }) }}
                                                key={`${genre}${index}`}
                                                bg="success"
                                                style={{ marginLeft: "20px" }}>
                                                {genre}
                                            </Badge>)}
                                    </p>
                                </Row>
                            }
                            {movie.countries?.length > 0 &&
                                <Row>
                                    <p>
                                        Countries: {movie.countries.map((countrie, index) =>
                                            <Badge
                                                onClick={() => { navigateWithParams({ countries: [countrie] }) }}
                                                key={`${countrie}${index}`}
                                                bg="info"
                                                style={{ marginLeft: "20px" }}>
                                                {countrie}
                                            </Badge>)}
                                    </p>
                                </Row>
                            }
                            {movie.directors?.length > 0 &&
                                <Row>
                                    <p>
                                        Directors: {movie.directors.map((director, index) =>
                                            <Badge
                                                onClick={() => { navigateWithParams({ directors: [director] }) }}
                                                key={`${director}${index}`}
                                                bg="danger"
                                                style={{ marginLeft: "20px" }}>
                                                {director}
                                            </Badge>)}
                                    </p>
                                </Row>
                            }
                            {movie.writers?.length > 0 &&
                                <Row>
                                    <p>
                                        Writers: {movie.writers.map((writer, index) =>
                                            <Badge
                                                onClick={() => { navigateWithParams({ writers: [writer] }) }}
                                                key={`${writer}${index}`}
                                                pill
                                                bg="danger"
                                                style={{ marginLeft: "20px" }}>
                                                {writer}
                                            </Badge>)}
                                    </p>
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
                        {props.profile.user
                            ? <>
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
                                    <CommentsSection comments={comments} />
                                </Row>
                            </>
                            : <EmptyState message={"Login required to see comments."} link={{ href: "/auth", text: "Auth" }} />
                        }
                    </Col>
                </Row>
            </Container >
            : <Preloader />
        }
    </div >
}

const CommentsSection = ({ comments }) => {

    return <>
        {comments.length
            ? <div>
                {comments.map((comment) => {
                    return <Card key={comment._id} style={{ marginTop: '10px' }} className={`mb-2`} >
                        <Card.Header>
                            <Row>
                                <Col>
                                    {comment.name} <span style={{ marginLeft: '3%' }} className={'text-muted'}>{comment.date}</span>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    {comment.text}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Reply...
                                </Col>
                            </Row>
                        </Card.Body>
                        {comment.replies?.length > 0
                            ? <>
                                {comment.replies.map(reply => {
                                    return <ListGroup className="list-group-flush">
                                        <ListGroupItem>
                                            <Row>
                                                <Col xs={1}>
                                                    <img src={repliedIcon} alt="Replied icon" style={{ width: "30%" }} />
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            {reply.name} <span style={{ marginLeft: '3%' }} className={'text-muted'}>{reply.date}</span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            {reply.text}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                })}

                            </>
                            : <></>}
                    </Card>

                })}
            </div>
            : <EmptyState message={"No comments on this movie yet"} />
        }
    </>
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, { setParams })(Movie)