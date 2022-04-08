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