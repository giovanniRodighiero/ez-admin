import React from 'react';
import { Typography, Grid } from '@material-ui/core';


export default ({ children }) => (
    <Grid item xs={12}>
        <Typography color="error" variant="body1">{children}</Typography>
    </Grid>
);