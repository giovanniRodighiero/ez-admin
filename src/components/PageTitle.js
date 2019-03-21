import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Fab, Grid, withStyles } from '@material-ui/core';
import { MdArrowBack } from 'react-icons/md';

const styles = theme => ({
    header: {
        margin: '15px 0',
        display: 'flex',
        alignItems: 'center'
    },

    backButton: {
        marginRight: '15px'
    }
});

const PageTitle = ({ classes, backPath = '', children }) => (
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

export default withStyles(styles)(PageTitle);