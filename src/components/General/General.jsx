import React, { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCategorieMovies, getLatestMovies, getRandomMovie, getTopMovies } from "../../api/movieAPI";
import ImageComponent from "../helpers/imageComponent";
import { movieGenres } from "../../constants/categories";
import Preloader from "../helpers/Preloader";

const General = () => {

    const [topMovies, setTopMovies] = useState([]);
    const [latesMovies, setLatestMovies] = useState([]);
    const [categorieMovies, setCategorieMovies] = useState([]);

    useEffect(() => {
        getTopMovies().then((response) => {
            if (response.data?.movies) {
                setTopMovies(response.data.movies);
            }
        });
        getLatestMovies().then((response) => {
            if (response.data?.movies) {
                setLatestMovies(response.data.movies);
            }
        });
        getCategorieMovies().then((response) => {
            if (response.data?.movies) {
                setCategorieMovies(response.data.movies);
            }
        });
    }, []);

    return <Container>
        <Row>
            <h1>Hot</h1>
            <CarouselComponent movies={topMovies} />
        </Row>
        <Row>
            <h1>Latest</h1>
            <CarouselComponent movies={latesMovies} />
        </Row>
        <Row>
            <h1>Categories</h1>
            <CategoriesCarousel movies={categorieMovies} />
        </Row>
    </Container>
}

const CarouselComponent = (props) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 9
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    return <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        keyBoardControl={true}
    >
        {props.movies.length
            ? props.movies.map((movie) => {
                return <div key={movie._id}>
                    <Col style={{ padding: "5px" }}>
                        <Card as={Link} to={`/movie/${movie._id}`} className={'h-100'} style={{ textDecoration: 'none', color: 'black' }}>
                            <ImageComponent image={movie.poster} />
                            <Card.Body>
                                <p title={movie.title}>
                                    {movie.title.length > 20 ? `${movie.title.slice(0, 20)}... ` : `${movie.title} `}
                                    <b>({movie.year})</b>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            })
            : <Preloader />
        }
    </Carousel>
}

const CategoriesCarousel = (props) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 9
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
    return <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        keyBoardControl={true}
    >
        {Object.keys(props.movies).length
            ? movieGenres.map((genre) => {
                return <div title={props.movies[`${genre}`].title} key={genre}>
                    <Col style={{ textDecoration: 'none', color: 'black', padding: "5px" }}>
                        <Card className={'h-100'}>
                            <ImageComponent image={props.movies[`${genre}`].poster} />
                            <Card.Body>
                                <p title={genre}>
                                    {genre}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            })
            : <Preloader />
        }
    </Carousel>
}

export default General;