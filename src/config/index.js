const apiUrls = {
    development: 'http://localhost:4000',
    production: 'http://localhost:4000'
};

export const api = {
    baseUrl: apiUrls[process.env.REACT_APP_ENV || 'development'],
}

export const auth = {
    localStorageKey: 'admin-token'
}