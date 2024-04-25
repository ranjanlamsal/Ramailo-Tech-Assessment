import axios from 'axios';

const apiUrl = "http://localhost:8001";

export const url = axios.create({
    baseURL: `${apiUrl}/`,
});

url.interceptors.request.use(function (req) {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.authorization = `token ${token}`;
        return req;
    }
    return req;
});
