import React, { useEffect, useRef, useState } from "react";
import { getMovies, searchMovies } from "../../api/movieAPI";
import { Pagination, Row, Col, Card, Container, Overlay, Popover, FormControl, InputGroup, Button } from "react-bootstrap";
import SearchParams from "./SearchParams";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setParams, setPage, setLimit, setSort } from "../../store/reducers/search.reducer";
import ImageComponent from "../helpers/imageComponent";
import Preloader from "../helpers/Preloader";

const MovieList = (props) => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const [movies, setMovies] = useState(null);
    const [total, setTotal] = useState(null);
    const [moviesNumber, setMoviesNumber] = useState(0);

    useEffect(() => {
        loadMovies();
        //eslint-disable-next-line 
    }, [props.search?.params]);

    useEffect(() => {
        loadMovies();
        //eslint-disable-next-line 
    }, []);

    const loadMovies = (newPage = props.search?.page || 1, newLimit = props.search?.limit || 10) => {
        props.setPage(newPage);
        props.setLimit(newLimit);
        if (!props.search?.params) {
            getMovies(newPage, newLimit).then((response) => {
                setMovies(response.data.movies);
                setTotal(response.data.totalPages);
                setMoviesNumber(response.data.total);
            });
        } else {
            searchMovies({ params: props.search?.params || {}, page: newPage, limit: newLimit }).then((response) => {
                setMovies(response.data.movies);
                setTotal(response.data.totalPages);
                setMoviesNumber(response.data.total);
            })
        }
    }

    return <>
        <SearchParams
            initialParams={props.search?.params ? props.search?.params : null}
            isUsed={props.search?.isUsed}
            setParams={props.setParams} />
        <Container style={{ padding: "20px" }}>
            <h3 >Found {moviesNumber} movies</h3>
            {movies
                ? <>
                    <Row xs={1} md={5} >
                        {movies.map((movie) => {
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
                </>
                : <Preloader />}
        </Container>

        {total && <PaginationComponent
            pagesCount={total}
            currentPage={props.search?.page ? props.search.page : 1}
            setCurrentPage={props.setPage}
            loadMovies={loadMovies} />}
    </>
}

const PaginationComponent = ({ pagesCount, currentPage, setCurrentPage, loadMovies, alwaysShown = true }) => {
    const isPaginationShown = alwaysShown ? true : pagesCount > 1;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const [pageInput, setPageInput] = useState(currentPage);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const changePage = number => {
        if (currentPage === number) return;
        if (number < 1) number = 1;
        if (number > pagesCount) number = pagesCount;
        setCurrentPage(number);
        loadMovies(number);
    };

    const onPageNumberClick = pageNumber => {
        changePage(pageNumber);
    };

    const onPreviousPageClick = () => {
        changePage(currentPage - 1);
    };

    const onNextPageClick = () => {
        changePage(currentPage + 1);
    };

    const setLastPageAsCurrent = () => {
        if (currentPage > pagesCount) {
            setCurrentPage(pagesCount);
        }
    };

    const handleInputChange = e => {
        setPageInput(e.target.value);
    };

    let isPageNumberOutOfRange;
    const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers =
            Math.abs(pageNumber - currentPage) <= 2;

        if (
            isPageNumberFirst ||
            isPageNumberLast ||
            isCurrentPageWithinTwoPageNumbers
        ) {
            isPageNumberOutOfRange = false;
            return (
                <Pagination.Item
                    key={pageNumber}
                    onClick={() => onPageNumberClick(pageNumber)}
                    active={pageNumber === currentPage}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <Pagination.Ellipsis key={pageNumber} onClick={handleClick} className="muted" />;
        }

        return null;
    });

    //eslint-disable-next-line 
    useEffect(setLastPageAsCurrent, [pagesCount]);
    return (
        <>
            {isPaginationShown && (
                <div style={{ padding: "20px" }}>
                    <Pagination >
                        <Pagination.Prev
                            onClick={onPreviousPageClick}
                            disabled={isCurrentPageFirst}
                        />
                        {pageNumbers}
                        <Pagination.Next
                            onClick={onNextPageClick}
                            disabled={isCurrentPageLast}
                        />
                    </Pagination>
                    <div ref={ref}>
                        <Overlay
                            show={show}
                            target={target}
                            placement="top"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained">
                                <Popover.Header as="h3">Go to</Popover.Header>
                                <Popover.Body>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type={"number"}
                                            onChange={handleInputChange}
                                        />
                                        <Button variant="outline-secondary" onClick={() => onPageNumberClick(pageInput)}>
                                            Button
                                        </Button>
                                    </InputGroup>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    ...state
})

export default connect(mapStateToProps, { setParams, setPage, setLimit, setSort })(MovieList)