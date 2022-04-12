import React, { useEffect, useState } from "react";
import { getMovies, searchMovies } from "../../api/movieAPI";
import { Pagination, Row, Col, Card } from "react-bootstrap";
import SearchParams from "./SearchParams";
import { Link } from "react-router-dom";

const MovieList = () => {

    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(null);
    const [params, setParams] = useState(null);

    useEffect(() => {
        loadMovies();
        //eslint-disable-next-line 
    }, [params]);

    useEffect(() => {
        loadMovies();
        //eslint-disable-next-line 
    }, []);

    const loadMovies = (newPage = page, newLimit = limit) => {
        setPage(newPage);
        setLimit(newLimit);
        if (!params) {
            console.log('No params')
            getMovies(newPage, newLimit).then((response) => {
                setMovies(response.data.movies);
                setTotal(response.data.totalPages);
            });
        } else {
            console.log('With params')
            searchMovies({ params, page: newPage, limit: newLimit }).then((response) => {
                setMovies(response.data.movies);
                setTotal(response.data.totalPages);
            })
        }
    }

    return <>
        <SearchParams setParams={setParams} />
        {movies
            ? <>
                <Row xs={1} md={5} style={{ padding: "20px" }}>
                    {movies.map((movie) => {
                        return <Col as={Link} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Card>
                                <Card.Img variant="top" src={movie.poster} />
                                <Card.Body >
                                    <p>{movie.title}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </>
            : <>Loading....</>}

        {total && <PaginationComponent pagesCount={total} currentPage={page} setCurrentPage={setPage} loadMovies={loadMovies} />}
    </>
}

const PaginationComponent = ({ pagesCount, currentPage, setCurrentPage, loadMovies, alwaysShown = true }) => {
    const isPaginationShown = alwaysShown ? true : pagesCount > 1;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const changePage = number => {
        if (currentPage === number) return;
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
            return <Pagination.Ellipsis key={pageNumber} className="muted" />;
        }

        return null;
    });

    //eslint-disable-next-line 
    useEffect(setLastPageAsCurrent, [pagesCount]);

    return (
        <>
            {isPaginationShown && (
                <Pagination>
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
            )}
        </>
    );
};

export default MovieList;