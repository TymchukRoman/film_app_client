import { client } from "./axiosClient";

export const getMovies = async (page, limit) => {
    return client.get(`movie/all/${page}/${limit}`);
}

export const getMovie = async (movieId) => {
    return client.get(`movie/id/${movieId}`);
}

export const searchMovies = async (params) => {
    return client.post(`movie/search`, { ...params });
}