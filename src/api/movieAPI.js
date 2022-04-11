import { client } from "./axiosClient";

export const getMovies = async (page, limit) => {
    return client.get(`movie/all/${page}/${limit}`);
}

export const searchMovies = async (params) => {
    return client.post(`movie/search`, { ...params });
}