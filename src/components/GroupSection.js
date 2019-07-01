import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Collapse, IconButton } from '@material-ui/core';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    group: {
        padding: '10px 20px',
    },
    card: {
        marginBottom: '20px'
    },
    cardHeader: {
        cursor: 'pointer',
        padding: '8px 12px',
        color: theme.palette.primary.dark
    },
    cardContent: {
        padding: '0 !important',
    }
}));


function GroupSection (props) {
    const { title, subtitle, children } = props;
    const classes = useStyles();
    const [ open, setOpen ] = useState(props.open || false);

    return (
        <Grid item xs={12}>
            <Card className={classes.card} elevation={5}>
                <CardHeader
                    className={classes.cardHeader}
                    onClick={_ => setOpen(!open)}
                    title={title}
                    subheader={subtitle}
                    action={
                        <IconButton>
                            { !open && <FaChevronDown size="30px" color="black" /> }
                            { open && <FaChevronUp size="30px" color="black" /> }
                        </IconButton>
                    }
                />
                <Collapse in={open}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.group}>
                            {children} 
                        </div>
                    </CardContent>
                </Collapse>     
            </Card>     
        </Grid>
    );
}

export default GroupSection;

