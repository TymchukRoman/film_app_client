import { client } from "./axiosClient";

export const getCats = async (cat, search) => {
    return client.get(`cats/${cat}/${search || ''}`);
}
