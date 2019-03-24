import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import { IconButton, Grid } from '@material-ui/core';
import { MdEdit, MdDelete } from 'react-icons/md';

import { TableCell } from './Table';

import I18n from '../config/I18n';

export default ({
    classes,
    onConfirmDialogOpen,

    users = [],
    currentPage,
    totalCount,
    perPage,

    onChangePage,
    onChangeRowsPerPage
}) => (
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