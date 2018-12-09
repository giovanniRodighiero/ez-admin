import React from 'react';

export default React.createContext({
    notificationOpen: false,
    notificationMessage: '',
    notificationType: 'success',
    setNotification: () => {},
    dismissNotification: () => {}
});