import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, ListSubheader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MdPeople, MdSettings } from 'react-icons/md';

import I18n from '../config/I18n';

const styles = theme => ({
    drawerPaper: {
        width: '230px',
        marginTop: theme.mixins.toolbar.minHeight + 10,
        paddingTop: '15px'
    },
    subheader: {
        lineHeight: '1.5'
    }
})

const renderLink = ({ to, ...itemProps}) => <Link to={to} {...itemProps} />;

const LinkTitle = ({ classes, text }) => <ListSubheader component="div" className={classes.subheader}>{text}</ListSubheader>

const Component = ({ classes, open, onClose, variant }) => (
    <Drawer
        variant={variant}
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={open}
        onClose={onClose}
    >
        <List
            component="nav"
            subheader={<LinkTitle classes={classes} text={I18n.t.navBar.pages} />}
        >

        </List>

        <List
            component="nav"
            subheader={<LinkTitle classes={classes} text={I18n.t.navBar.admin} />}
        >

            {/* USERS PAGE */}
            <ListItem button component={renderLink} to="/users" onClick={onClose}>
                <ListItemIcon><MdPeople size="1.5em" /></ListItemIcon>
                <ListItemText>{I18n.t.navBar.users}</ListItemText>
            </ListItem>
            
            {/* SETTINGS PAGE */}
            <ListItem button component={renderLink} to="/settings">
                <ListItemIcon><MdSettings size="1.5em" /></ListItemIcon>
                <ListItemText>{I18n.t.navBar.settings}</ListItemText>
            </ListItem>

        </List>
    </Drawer>
);

const NavBar = ({ classes, open, onClose }) => (
    <React.Fragment>    
        <Hidden smDown>
            <Component classes={classes} open={open} onClose={onClose} variant="permanent" />
        </Hidden>
        <Hidden mdUp>
            <Component classes={classes} open={open} onClose={onClose} variant="temporary" />
        </Hidden>
    </React.Fragment>
);

export default withStyles(styles)(NavBar);