import { client } from "./axiosClient";

export const userMe = async (token) => {
    return client.post('/user/me', { token })
}

export const loginUser = async (data) => {
    return client.post('/user/login', { ...data })
}

export const registerUser = async (data) => {
    return client.post('/user/register', { ...data })
}

export const getFavorites = async (token, amount) => {
    return client.post('/user/favorites', { token, amount })
}

export const editFavorite = async (token, type, movieId) => {
    return client.post('/user/editfavorite', {
        token, type, movieId
    })
}