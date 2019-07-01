import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import UserListTable from '../components/UserListTable';
import ConfirmationDialog from '../components/ConfirmationDialog';
import FloatingButton from '../components/FloatingButton';
import PageTitle from '../components/PageTitle';

import useListData from '../components/UseListData';

import I18n from '../config/I18n';

const useListOptions = {
    apiPath: '/api/v1/users',
    sort: 'email'
};

const useStyles = makeStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
}));

function UserListHook (props) {

    const classes = useStyles();

    const [ confirmModalOpen, setConfirmModalOpen ] = React.useState(false);
    const [ recordToDelete, setRecordToDelete ] = React.useState({});
    const [ tableData, setTableData, deleteData ] = useListData({ ...useListOptions, history: props.history });

    const onChangePage = (e, currentPage) => setTableData({ ...tableData.pagination, currentPage: currentPage + 1 });
    const onChangeRowsPerPage = (e, item) => setTableData({ ...tableData.pagination, perPage: parseInt(item.key) });
    const onSortChange = fieldName => e => {
        if (tableData.pagination.sort === fieldName) // same field, just invert the order
            setTableData({ ...tableData.pagination, sortDir: tableData.pagination.sortDir === -1 ? 1 : -1 });
        else // different field, default to -1
            setTableData({ ...tableData.pagination, sort: fieldName, sortDir: -1 });
    };
    const onDialogConfirm = _ => {
        setConfirmModalOpen(false);
        deleteData(recordToDelete._id);
        setRecordToDelete({});
    };

    return (
        <React.Fragment>

            <ConfirmationDialog
                open={confirmModalOpen}
                onClose={ _ => { setConfirmModalOpen(false); setRecordToDelete({}) } }
                onConfirm={onDialogConfirm}
                I18nKey="users"
                whatToDelete={recordToDelete.email || ''}
            />

            <PageTitle>{I18n.t.users.pageTitle}</PageTitle>

            <UserListTable
                { ...tableData.data }
                { ...tableData.pagination }
                classes={classes}
                onConfirmDialogOpen={ record => { setConfirmModalOpen(true); setRecordToDelete(record); } }
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                onSortChange={onSortChange}
            />

            <FloatingButton to="/users/new" component={Link}>
                <MdAdd size="28px" />
            </FloatingButton>

        </React.Fragment>
    );

};

export default UserListHook;