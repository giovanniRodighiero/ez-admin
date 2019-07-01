import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableFooter, TablePagination, TableSortLabel } from '@material-ui/core';
import { IconButton, Grid } from '@material-ui/core';
import { MdEdit, MdDelete } from 'react-icons/md';

import { TableCell } from './Table';

import I18n from '../config/I18n';

export default ({
    classes,
    onConfirmDialogOpen,

    data: users,
    currentPage,
    totalCount,
    perPage,

    onChangePage,
    onChangeRowsPerPage,

    sort,
    sortDir,
    onSortChange
}) => (
    <Grid item xs={12}>
        <Table padding="default">
            <TableHead>
                <TableRow>
                    <TableCell width="35%" className={classes.head}>
                        <TableSortLabel
                            active={sort === 'email'}
                            direction={sortDir === -1 ? 'desc' : 'asc'}
                            onClick={onSortChange('email')}
                        >
                            Email
                        </TableSortLabel>
                    </TableCell>
                    <TableCell width="20%" className={classes.head}>
                        <TableSortLabel
                            active={sort === 'role'}
                            direction={sortDir === -1 ? 'desc' : 'asc'}
                            onClick={onSortChange('role')}
                        >
                            {I18n.t.users.role}
                        </TableSortLabel>
                    </TableCell>
                    <TableCell width="25%" className={classes.head}>
                        <TableSortLabel
                            active={sort === 'accountConfirmed'}
                            direction={sortDir === -1 ? 'desc' : 'asc'}
                            onClick={onSortChange('accountConfirmed')}
                        >
                            {I18n.t.users.accountStatus}
                        </TableSortLabel>
                    </TableCell>
                    <TableCell width="20%" className={classes.head}>{I18n.t.users.actions}</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {users.map(user => (
                    <TableRow key={user._id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{I18n.t.users.roles[user.role]}</TableCell>
                        <TableCell>{user.accountConfirmed ? I18n.t.users.accountConfirmed : I18n.t.users.accountNotConfirmed}</TableCell>
                        <TableCell>
                            <IconButton component={Link} to={`/users/${user._id}`}><MdEdit /></IconButton>
                            <IconButton onClick={_ => onConfirmDialogOpen(user)}><MdDelete /></IconButton>
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
                        rowsPerPage={perPage}
                        page={currentPage - 1}
                        count={totalCount}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </Grid>
);