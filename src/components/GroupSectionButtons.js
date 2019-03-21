import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
    wrapper: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '15px 0'
    }
});

const GroupSectionButtons = ({ children, classes }) => (
    <Grid item xs={12}>
        <div className={classes.wrapper}>{children}</div>
    </Grid>
);

export default withStyles(styles)(GroupSectionButtons);