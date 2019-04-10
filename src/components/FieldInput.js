import React from 'react';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({
    // textField: {
    //     marginTop: 0
    // }
});

const FieldInput = props => <TextField {...props} margin="dense" fullWidth />;

export default withStyles(styles)(FieldInput);