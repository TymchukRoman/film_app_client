import React, { useEffect, useState } from "react";
import { getMovies } from "../../api/movieAPI";
import { Pagination } from "react-bootstrap";
import SearchParams from "./SearchParams";

const MovieList = () => {

    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = (newPage = page, newLimit = limit) => {
        setPage(newPage);
        setLimit(newLimit);
        getMovies(newPage, newLimit).then((response) => {
            setMovies(response.data.movies);
            setTotal(response.data.totalPages);
        });
    }

    return <>
        <SearchParams />
        {movies
            ? <>
                {movies.map((movie) => {
                    return <p key={movie._id}>{movie.title}</p>
                })}
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