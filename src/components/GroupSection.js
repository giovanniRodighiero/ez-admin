import React from 'react';
import { grey } from '@material-ui/core/colors';
import { Grid, Card, CardHeader, CardContent, withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    group: {
        // marginBottom: '30px',
        padding: '10px 20px',
    },
    cardContent: {
        padding: '0 !important',
    }
});

const GroupSection = ({ classes, children, title, subtitle }) => (
    <Grid item xs={12}>
        <Card>
            <CardHeader title={title} subheader={subtitle} />
            <CardContent className={classes.cardContent}>
                <div className={classes.group}>
                    {children} 
                </div>
            </CardContent>
        </Card>     
    </Grid>
);

export default withStyles(styles)(GroupSection);

