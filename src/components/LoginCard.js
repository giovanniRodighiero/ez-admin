import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    loginCard: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)',
        minWidth: '70%',
        minHeight: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

const LoginCard = ({ children }) => {
    const classes = useStyles();

    return <Card className={classes.loginCard}>{children}</Card>;
}

export default LoginCard;