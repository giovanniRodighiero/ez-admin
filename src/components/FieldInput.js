import React from 'react';
import { TextField } from '@material-ui/core';

// const styles = makeStyles(theme => ({
//     // textField: {
//     //     marginTop: 0
//     // }
// }));

const FieldInput = props => <TextField {...props} margin="dense" fullWidth />;

export default FieldInput;