import React from 'react';
import { Fab, withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        zIndex: 10
    }
});

const FloatingButton = props => (
    <Fab color="primary" aria-label="Save" className={props.classes.root} {...props}>
        {props.children}
    </Fab>
);

export default withStyles(styles)(FloatingButton);