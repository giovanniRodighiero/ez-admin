import React from 'react';
import { TableCell as DefaultTableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    tableCell: {
        padding: '0 20px'
    },
    head: {
        padding: '5px',
    }
}));

export const TableCell = ({ children, width, ...props }) => {
    const classes = useStyles();

    return (
        <DefaultTableCell
            classes={{ root: classes.tableCell, head: classes.head }}
            style={{ width }}
            {...props}
        >{ children }</DefaultTableCell>
    );
};