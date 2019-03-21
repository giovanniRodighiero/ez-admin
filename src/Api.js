import Axios from 'axios';

import { api, auth } from './config';


const axiosInstance = Axios.create({
    baseURL: api.baseUrl,
    timeout: 10000,
    headers: {}
});

axiosInstance.interceptors.request.use(config => {
    const token = window.localStorage.getItem(auth.localStorageKey);
    if (token)
        config.headers['authorization'] = 'Bearer ' + token;
    else
        delete config.headers['authorization'];
    return config;
});

axiosInstance.interceptors.response.use(response => response.data, error => {
    console.log(error.response)

    if (!error.response) {
        console.log('connection error !');
    }

    if (error.response.status === 401 && window.location.pathname != '/login') {
        window.localStorage.removeItem(auth.localStorageKey);
        window.location.href = '/login?notification=sessionExpired';
    }
    return Promise.reject(error)
});


// API
axiosInstance.getUserProfile = _ => axiosInstance.get('/api/v1/users/me');
axiosInstance.updateMyProfileInfos = body => axiosInstance.put('/api/v1/users/me/profile', body);
axiosInstance.updateMyProfilePassword = body => axiosInstance.put('/api/v1/users/me/password', body);
axiosInstance.login = body => axiosInstance.post('/api/v1/login', body);

export default axiosInstance;