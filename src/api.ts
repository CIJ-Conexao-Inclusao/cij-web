import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3040/cij/api/v1/",
    withCredentials: true
})

export default api;