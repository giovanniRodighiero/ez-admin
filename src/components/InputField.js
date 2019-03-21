import React from 'react';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({

});

const InputField = props => <TextField {...props}  fullWidth />;

export default withStyles(styles)(InputField);