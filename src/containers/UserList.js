import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import { IconButton, Button, withStyles } from '@material-ui/core';
import { MdEdit, MdDelete } from 'react-icons/md';

import ConfirmationDialog from '../components/ConfirmationDialog';

import NotificationContext from '../components/NotificationContext';
import Api from '../Api';
import I18n from '../config/I18n';


const styles = theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
})

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

    onDeleteConfirm () {}

    render () {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <ConfirmationDialog
                    confirmDialogOpen={this.state.confirmDialogOpen}
                    onConfirmDialogClose={this.onConfirmDialogClose}
                    I18nKey="users"
                    whatToDelete={this.state.userToDelete.email || ''}
                />
                <Button onClick={_ => this.context.setNotification({ notificationMessage: 'prova', notificationType: 'info' })}>notification</Button>
                <Table>
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
            </React.Fragment>
        );
    }

}

UserList.contextType = NotificationContext;

export default withStyles(styles)(UserList);