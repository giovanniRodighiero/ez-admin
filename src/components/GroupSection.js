import React from 'react';
import { Grid, Card, CardHeader, CardContent, withStyles, Collapse, IconButton } from '@material-ui/core';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const styles = theme => ({
    group: {
        padding: '10px 20px',
    },
    card: {
        marginBottom: '20px'
    },
    cardHeader: {
        cursor: 'pointer'
    },
    cardContent: {
        padding: '0 !important',
    }
});

class GroupSection extends React.Component {

    state = {
        open: this.props.open
    }

    constructor (props) {
        super(props);

        this.toggleAccordion = this.toggleAccordion.bind(this);
    }

    render () {
        const { classes, title, subtitle, children } = this.props;
        
        return (
            <Grid item xs={12}>
                <Card className={classes.card} elevation={5}>
                    <CardHeader
                        className={classes.cardHeader}
                        onClick={this.toggleAccordion}
                        title={title}
                        subheader={subtitle}
                        action={
                            <IconButton>
                                { !this.state.open && <FaChevronDown size="30px" color="black" /> }
                                { this.state.open && <FaChevronUp size="30px" color="black" /> }
                            </IconButton>
                        }
                    />
                    <Collapse in={this.state.open}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.group}>
                                {children} 
                            </div>
                        </CardContent>
                    </Collapse>     
                </Card>     
            </Grid>
        )
    }

    toggleAccordion () {
        this.setState(prevState => ({ open: !prevState.open }));
    }
}

export default withStyles(styles)(GroupSection);

