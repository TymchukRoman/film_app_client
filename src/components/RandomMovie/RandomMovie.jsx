import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getRandomMovie } from "../../api/movieAPI";
import Preloader from "../helpers/Preloader";

const RandomMovie = () => {

    const [loaded, setLoaded] = useState(false);
    const [movieId, setMovieId] = useState(null);

    useEffect(() => {
        getRandomMovie().then(response => {
            if (response.data?.movie?._id) {
                setMovieId(response.data.movie._id);
                setLoaded(true);
            }
        })
    }, []);

    return (loaded && movieId) ? <Navigate to={`/movie/${movieId}`} /> : <Preloader />
}

export default RandomMovie;