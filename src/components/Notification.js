import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import classNames from 'classnames';
import { MdCheck, MdError, MdInfo } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    message: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
        textTransform: 'capitalize'
    },
    icon: {
        marginRight: '10px'
    }
}));

const Notification = ({ open, dismissNotification, message, type = 'success', className }) => {
    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={dismissNotification}
        >
            <SnackbarContent
                className={classNames(classes[type], className)}
                aria-describedby="client-snackbar"
                message={<span className={classes.message}>
                    { type === 'success' && <MdCheck className={classes.icon} /> }
                    { type === 'error' && <MdError className={classes.icon} /> }
                    { type === 'warning' && <MdInfo className={classes.icon} /> }
                    { type === 'info' && <MdInfo className={classes.icon} /> }
                    {message}
                </span>}
            />
        </Snackbar>
    );
}

export default Notification;