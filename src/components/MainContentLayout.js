import React from 'react';
import { withStyles, Hidden, Grid } from '@material-ui/core';

const styles = theme => ({
    contentsDesktop: {
        marginTop: theme.mixins.toolbar.minHeight + 10,
        marginLeft: '230px',
        padding: '15px',
        marginBottom: '70px'
    },
    contentsMobile: {
        marginTop: theme.mixins.toolbar.minHeight + 10,
        padding: '15px'
    },
});

const MainContentLayout = ({ children, classes }) => (
    <React.Fragment>
        <Hidden smDown>
            <main className={classes.contentsDesktop}>
                <Grid container spacing={16}>
                    {children}
                </Grid>
            </main>
        </Hidden>
        <Hidden mdUp>
            <main className={classes.contentsMobile}>
                <Grid container spacing={16}>
                    {children}
                </Grid>
            </main>
        </Hidden>
    </React.Fragment>
);

export default withStyles(styles)(MainContentLayout);