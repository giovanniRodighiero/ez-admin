import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    contents: {
        marginTop: theme.mixins.toolbar.minHeight + 10,
        marginLeft: '200px',
        padding: '15px'
    }
});

const MainContentLayout = ({ children, classes }) => (
    <main className={classes.contents}>
        {children}
    </main>
);

export default withStyles(styles)(MainContentLayout);