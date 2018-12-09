import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Hidden, withStyles } from '@material-ui/core';
import { MdAccountCircle, MdMenu } from 'react-icons/md';

import I18n from '../config/I18n';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    logoName: {
        marginLeft: '30px',
        flexGrow: 1
    },
    account: {
        marginLeft: '5px',
        color: 'white'
    }
});

const TopBar = ({ email, classes }) => (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Hidden mdUp>
                <IconButton color="inherit" aria-label="Menu">
                    <MdMenu />
                </IconButton>
            </Hidden>
            <Typography variant="h4" color="inherit" className={classes.logoName}>{I18n.t.topBar.title}</Typography>
            <IconButton color="inherit" aria-label="account" href="/profile">
                <MdAccountCircle />
            </IconButton>
            <Typography variant="body1" className={classes.account}>{email}</Typography>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(TopBar);