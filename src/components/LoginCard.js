import React from 'react';
import { Card, withStyles } from '@material-ui/core';

const styles = theme =>({
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
});

const LoginCard = ({ children, classes }) => <Card className={classes.loginCard}>{children}</Card>;

export default withStyles(styles)(LoginCard);