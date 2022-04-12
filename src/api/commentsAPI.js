import { client } from "./axiosClient";

export const getComments = async (movieId) => {
    return client.get(`comment/get/${movieId}`);
}