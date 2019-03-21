import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import { IconButton, Grid, withStyles } from '@material-ui/core';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

import ConfirmationDialog from '../components/ConfirmationDialog';
import FloatingButton from '../components/FloatingButton';
import PageTitle from '../components/PageTitle';
import { TableCell } from '../components/Table';

import NotificationContext from '../components/NotificationContext';
import Api from '../Api';
import I18n from '../config/I18n';


const styles = theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
});

class UserList extends React.Component {

    state = {
        confirmDialogOpen: false,
        userToDelete: {},
        users: [],
        availablePages: 1,
        currentPage: 1,
        totalCount: 0
    }

    constructor (props) {
        super(props);

        this.onConfirmDialogClose = this.onConfirmDialogClose.bind(this);
        this.onConfirmDialogOpen = this.onConfirmDialogOpen.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    }

    async componentDidMount () {
        try {
            const { data: users, ...rest } = await Api.get('/api/v1/users');
            this.setState({ users, ...rest });
        } catch (error) {
            console.log(error);
        }
    }

    onConfirmDialogClose () {
        this.setState({ confirmDialogOpen: false, userToDelete: {} });
    }

    onConfirmDialogOpen (userToDelete) {
        this.setState({ confirmDialogOpen: true, userToDelete });
    }

    async onDeleteConfirm () {
        try {
            console.log(this.state.userToDelete);
        } catch (error) {
            
        }
    }

    render () {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <ConfirmationDialog
                    open={this.state.confirmDialogOpen}
                    onClose={this.onConfirmDialogClose}
                    onConfirm={this.onDeleteConfirm}
                    I18nKey="users"
                    whatToDelete={this.state.userToDelete.email || ''}
                />
                
                <PageTitle>{I18n.t.users.pageTitle}</PageTitle>

                <Grid item xs={12}>
                    <Table padding="dense">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.head}>Email</TableCell>
                                <TableCell className={classes.head}>{I18n.t.users.role}</TableCell>
                                <TableCell className={classes.head}>{I18n.t.users.accountStatus}</TableCell>
                                <TableCell className={classes.head}>{I18n.t.users.actions}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { this.state.users.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{I18n.t.users.roles[user.role]}</TableCell>
                                    <TableCell>{user.accountConfirmed ? I18n.t.users.accountConfirmed : I18n.t.users.accountNotConfirmed}</TableCell>
                                    <TableCell>
                                        <IconButton href={`/users/${user._id}`}><MdEdit /></IconButton>
                                        <IconButton onClick={_ => this.onConfirmDialogOpen(user)}><MdDelete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    labelRowsPerPage={I18n.t.tables.labelRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={4}
                                    rowsPerPage={5}
                                    page={this.state.currentPage - 1}
                                    count={this.state.totalCount}
                                    onChangePage={_ => ({})}
                                    onChangeRowsPerPage={_ => {}}
                                />                            
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Grid>
                                
                <FloatingButton to="/users/new" component={Link}>
                    <MdAdd size="28px" />
                </FloatingButton>
            </React.Fragment>
        );
    }

}

UserList.contextType = NotificationContext;

export default withStyles(styles)(UserList);