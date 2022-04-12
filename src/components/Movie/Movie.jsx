import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/movieAPI";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { getComments } from "../../api/commentsAPI";

const Movie = (props) => {

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const [moreExpanded, setMoreExpanded] = useState(false);
    const [comments, setComments] = useState([]);

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

    return <div>
        {movie
            ? <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={movie.poster} />
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <Container>
                            <Row>
                                <h3>{movie.title} ({movie.year})</h3>
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
                            <Row>
                                <p>Cast: {movie.cast.map(actor => <Badge key={actor} bg="dark" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
                            </Row>
                            <Row>
                                <p>Genres: {movie.genres.map(actor => <Badge key={actor} bg="success" style={{ marginLeft: "20px" }}>{actor} </Badge>)}</p>
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
                            {comments.length
                                ? <div>
                                    {comments.map((comment) => {
                                        return <Card style={{ marginTop: '10px' }} className={`mb-2`} >
                                            <Card.Header>{comment.name}</Card.Header>
                                            <Card.Body>
                                                {comment.text}
                                            </Card.Body>
                                            <Card.Footer className="text-muted">{comment.date}</Card.Footer>
                                        </Card>
                                    })}
                                </div>
                                : <p>No comments right now...</p>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container >
            : <p>Loading...</p>
        }
    </div >
}

const mapStateToProps = (state, ownProps) => ({
    ...state
})


export default connect(mapStateToProps, {})(Movie)