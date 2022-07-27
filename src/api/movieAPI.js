import { client } from "./axiosClient";

export const getMovies = async (page, limit, sort) => {
    return client.get(`movie/all/${page}/${limit}/${sort}`);
}

export const getMovie = async (movieId) => {
    return client.get(`movie/id/${movieId}`);
}

export const searchMovies = async (params) => {
    return client.post(`movie/search`, { ...params });
}

export const getTopMovies = async () => {
    return client.get(`movie/top/hot`);
}

export const getLatestMovies = async () => {
    return client.get(`movie/top/latest`);
}

export const getRandomMovie = async () => {
    return client.get(`movie/random`);
}

export const getCategorieMovies = async () => {
    return client.get(`movie/categories`);
}

export const getManyMovies = async (movieIds) => {
    return client.post(`movie/ids`, { movieIds });
}