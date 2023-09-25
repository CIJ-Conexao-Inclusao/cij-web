import axios from 'axios';

const api = axios.create({
    baseURL: "http://15.228.164.199:3040/cij/api/v1/",
    withCredentials: true
})

export default api;