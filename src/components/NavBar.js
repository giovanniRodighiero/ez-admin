import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MdPeople } from 'react-icons/md';

import I18n from '../config/I18n';

const styles = theme => ({
    drawerPaper: {
        width: '200px',
        marginTop: theme.mixins.toolbar.minHeight + 10
    },
})

const renderLink = ({ to, ...itemProps}) => <Link to={to} {...itemProps} />;

const NavBar = ({ classes }) => (
    <Drawer
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
    >
        <List>
            <ListItem button component={renderLink} to="/users">
                <ListItemIcon><MdPeople size="1.5em" /></ListItemIcon>
                <ListItemText>{I18n.t.navBar.users}</ListItemText>
            </ListItem>
        </List>
    </Drawer>
);

export default withStyles(styles)(NavBar);