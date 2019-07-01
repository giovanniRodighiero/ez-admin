import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Fab, Grid } from '@material-ui/core';
import { MdArrowBack } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        margin: '15px 0',
        display: 'flex',
        alignItems: 'center'
    },

    backButton: {
        marginRight: '15px'
    }
}));

const PageTitle = ({ backPath = '', children }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <header className={classes.header}>
                { !!backPath &&
                    <Fab
                        color="primary"
                        aria-label="Back"
                        size="small"
                        className={classes.backButton}
                        component={Link}
                        to={backPath}
                    >
                        <MdArrowBack size="24px" />
                    </Fab>
                }
                <Typography variant="h5" component="h1">{children}</Typography>
            </header>
        </Grid>
    );
}

export default PageTitle;