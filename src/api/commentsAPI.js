import { client } from "./axiosClient";

export const getComments = async (movieId) => {
    return client.get(`comment/get/${movieId}`);
}

export const newComment = async (movieId, text) => {
    const token = localStorage.getItem('auth_token');
    return client.post('/comment/new', {
        token, movieId, text
    })
}

export const replyComment = async (commentId, text) => {
    const token = localStorage.getItem('auth_token');
    return client.post('/comment/reply', {
        token, commentId, text
    })
}