import axios from 'axios';

var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        const token = window.accessToken ? window.accessToken : 'token';
        const isTokenExpired = window.isTokenExpired;
        console.log("Token:::- " + token);
        console.log("isTokenExpired:::- " + isTokenExpired);
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosInstance.interceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.reject(error);
});
export default axiosInstance;