import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '15px 0'
    }
}));

const GroupSectionButtons = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <div className={classes.wrapper}>{children}</div>
        </Grid>
    );
}

export default GroupSectionButtons;