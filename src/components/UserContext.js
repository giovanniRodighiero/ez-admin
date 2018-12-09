import React from 'react';

export default React.createContext({
    user: false,
    hasAccessToken: () => false,
    login: () => {},
    logout: () => {}
});