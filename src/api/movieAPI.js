import { client } from "./axiosClient";

export const getMovies = async (page, limit) => {
    return client.get(`movie/all/${page}/${limit}`);
}