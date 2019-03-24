import React from 'react';

export default React.createContext({
    // LOGGED IN USER CONTEXT
    user: {
        accountConfirmed: true,
        email: "info@crispybacon.it",
        role: 100,
        _id: "555",
        fetched: false
    },
    hasAccessToken: () => false,
    login: () => {},
    logout: () => {},

    // NOTIFICATION CONTEXT
    notificationOpen: false,
    notificationMessage: '',
    notificationType: 'success',
    setNotification: () => {},
    dismissNotification: () => {}
});