import React from 'react';
import { TableCell as DefaultTableCell, withStyles } from '@material-ui/core';

const styles = theme => ({
    tableCell: {
        padding: '0 5px'
    }
})

const TableCellComp = ({ classes, children, width, ...props }) => (
    <DefaultTableCell
        classes={{ paddingDense: classes.tableCell }}
        style={{ width }}
        {...props}
    >{ children }</DefaultTableCell>
);

export const TableCell = withStyles(styles)(TableCellComp);