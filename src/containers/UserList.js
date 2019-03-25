import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { MdAdd } from 'react-icons/md';

import ConfirmationDialog from '../components/ConfirmationDialog';
import FloatingButton from '../components/FloatingButton';
import PageTitle from '../components/PageTitle';
import UserListTable from '../components/UserListTable';

import GlobalContext from '../components/GlobalContext';
import Api from '../Api';
import I18n from '../config/I18n';

const API_PATH = '/api/v1/users';

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
        currentPage: 1,
        totalCount: 0,
        perPage : 5,
        sort: 'email',
        sortDir: -1
    }

    constructor (props) {
        super(props);

        this.fetchRecords = this.fetchRecords.bind(this);
        this.onConfirmDialogClose = this.onConfirmDialogClose.bind(this);
        this.onConfirmDialogOpen = this.onConfirmDialogOpen.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    componentDidMount () {
        const queryString = new window.URLSearchParams(this.props.history.location.search);
        const currentPage = queryString.get('page') || 1;

        let perPage = parseInt(queryString.get('perPage')) || 5;
        if (perPage === '0')
            perPage = 5
        
        this.setState({ currentPage, perPage }, this.fetchRecords);
    }

    render () {
        console.log('render currentPage:', this.state.currentPage)
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

                <UserListTable
                    {...this.state}
                    classes={this.props.classes}
                    onConfirmDialogOpen={this.onConfirmDialogOpen}
                    onChangePage={this.onChangePage}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    onSortChange={this.onSortChange}
                />
                                
                <FloatingButton to="/users/new" component={Link}>
                    <MdAdd size="28px" />
                </FloatingButton>
            </React.Fragment>
        );
    }

    async fetchRecords () {
        const { currentPage, perPage, sort, sortDir } = this.state;
        try {
            const path = `${API_PATH}?page=${currentPage}&perPage=${perPage}&sort=${sort}&sortDir=${sortDir}`;
            const { data: users, totalCount } = await Api.get(path);
            this.setState({ users, totalCount });
        } catch (error) {
            console.log(error);
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
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
            await Api.delete(`${API_PATH}/${this.state.userToDelete._id}`);
            const { data: users, ...rest } = await Api.get(API_PATH);
            this.setState({ users, confirmDialogOpen: false, userToDelete: {}, ...rest });
            this.context.setNotification({
                notificationType: 'success',
                notificationMessage: I18n.t.users.notification.deleteSuccess
            });
        } catch (error) {
            console.log(error);
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
        }
    }

    onChangePage (e, currentPage) {
        this.setState({ currentPage: currentPage + 1 }, _ => {
            const { perPage, sort, sortDir } = this.state;
            const path = `/users?page=${currentPage + 1}&perPage=${perPage}&sort=${sort}&sortDir=${sortDir}`;
            this.props.history.push(path);
            this.fetchRecords();
        });
    }

    onChangeRowsPerPage (e, item) {
        this.setState({ perPage: parseInt(item.key) }, _ => {
            const { currentPage, sort, sortDir } = this.state;
            const path = `/users?page=${currentPage}&perPage=${parseInt(item.key)}&sort=${sort}&sortDir=${sortDir}`;
            this.props.history.push(path);
            this.fetchRecords();
        });
    }

    onSortChange (fieldName) {
        return event => {
            if (this.state.sort === fieldName) {
                this.setState(prevState => ({ sortDir: prevState.sortDir === -1 ? 1 : -1 }), _ => {
                    const { sort, sortDir, currentPage, perPage } = this.state;
                    const path = `/users?page=${currentPage + 1}&perPage=${perPage}&sort=${sort}&sortDir=${sortDir === 1 ? -1 : 1 }`;
                    this.props.history.push(path);
                    this.fetchRecords();
                });
            } else {
                this.setState({ sort: fieldName, sortDir: -1 }, _ => {
                    const { sort, sortDir, currentPage, perPage } = this.state;
                    const path = `/users?page=${currentPage + 1}&perPage=${perPage}&sort=${sort}&sortDir=${sortDir === 1 ? -1 : 1 }`;
                    this.props.history.push(path);
                    this.fetchRecords();
                });
            }
        }
    }

}

UserList.contextType = GlobalContext;

export default withStyles(styles)(UserList);