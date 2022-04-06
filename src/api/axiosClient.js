import axios from 'axios'

const client = axios.create({
  baseURL: 'https://iqdauntest.herokuapp.com/',
  withCredentials: true,
})
