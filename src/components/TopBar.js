import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Hidden } from '@material-ui/core';
import { MdAccountCircle, MdMenu } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';

import I18n from '../config/I18n';

const useStyles = makeStyles(theme => ({
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
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

const TopBar = ({ email, onOpen }) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton color="inherit" aria-label="Menu" onClick={onOpen}>
                        <MdMenu />
                    </IconButton>
                </Hidden>
                <Typography variant="h4" color="inherit" className={classes.logoName}>
                    <Link to="/" className={classes.link}>{I18n.t.topBar.title}</Link></Typography>
                <IconButton color="inherit" aria-label="account" component={Link} to="/profile">
                    <MdAccountCircle />
                </IconButton>
                <Typography variant="body1" className={classes.account}>{email}</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;