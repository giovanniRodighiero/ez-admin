import React from 'react';
import { TableCell as DefaultTableCell, withStyles } from '@material-ui/core';

const styles = theme => ({
    tableCell: {
        padding: '0 5px'
    }
})

const TableCellComp = ({ classes, children, ...props }) => (
    <DefaultTableCell classes={{ paddingDense: classes.tableCell }} {...props}>{ children }</DefaultTableCell>
);

export const TableCell = withStyles(styles)(TableCellComp);