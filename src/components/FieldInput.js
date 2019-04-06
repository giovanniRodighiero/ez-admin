import React from 'react';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({

});

const FieldInput = props => <TextField {...props}  fullWidth />;

export default withStyles(styles)(FieldInput);