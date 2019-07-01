import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
}));

const MainContentLayout = ({ children }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Hidden smDown>
                <main className={classes.contentsDesktop}>
                    <Grid container>
                        {children}
                    </Grid>
                </main>
            </Hidden>
            <Hidden mdUp>
                <main className={classes.contentsMobile}>
                    <Grid container>
                        {children}
                    </Grid>
                </main>
            </Hidden>
        </React.Fragment>
    );
}
export default MainContentLayout;