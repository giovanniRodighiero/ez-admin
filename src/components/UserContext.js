import React from 'react';

export default React.createContext({
    user: {
        accountConfirmed: true,
        email: "info@crispybacon.it",
        role: 100,
        _id: "555",
        fetched: false
    },
    hasAccessToken: () => false,
    login: () => {},
    logout: () => {}
});