import React from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        zIndex: 10
    }
}));

const FloatingButton = props => {
    const classes = useStyles();

    return (
        <Fab color="primary" aria-label="Save" className={classes.root} {...props}>
            {props.children}
        </Fab>
    );
}


export default FloatingButton;