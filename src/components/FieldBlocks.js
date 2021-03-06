import React from 'react';
import { Grid, Button, IconButton } from '@material-ui/core';
import { MdAdd, MdDelete } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';

import Draggable from './FieldBlockDraggableContext';

const useStyles = makeStyles(theme => ({
    buttonsContainer: {
        marginTop: '16px'
    },
    blockContainer: {
        border: '3px solid',
        borderColor: theme.palette.primary.light,
        borderRadius: '5px',
        margin: '15px 0',
        padding: '5px 10px',
        paddingRight: '45px',
        position: 'relative',
        cursor: 'move'
    },
    deleteIcon: {
        position: 'absolute',
        right: '0',
        top: '0',
    }
}));

const FieldBlock = ({
    onAddBlock,
    onRemoveBlock,
    blocks = [],
    render,
    buttons = []
}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Draggable>
                    { blocks.sort((a, b) => a.position - b.position).map((block, i) => (
                        <div className={classes.blockContainer} key={i}>
                            
                            { render(block, i) }

                            <IconButton type="button" className={classes.deleteIcon} onClick={onRemoveBlock(i)}>
                                <MdDelete color="red" />
                            </IconButton>

                        </div>
                    ))}
                </Draggable>
            </Grid>

            <Grid item xs={12} className={classes.buttonsContainer}>
                { buttons.map(button => (
                    <Button
                        key={button.type}
                        color={button.color}
                        variant="contained"
                        onClick={onAddBlock(button.type)}
                    >
                        {button.name}
                        <MdAdd color="white" size="25px" />
                    </Button>
                ))}
            </Grid>
        </React.Fragment>
    );
}

export default FieldBlock;