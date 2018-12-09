import React from 'react';
import { TextField, Typography, Fade } from '@material-ui/core';

import I18n from '../config/I18n';

const LoginCardBoxForm = ({ styles, email = '', password = '', onEmailChange, onPasswordChange, error = false }) => (
    <div style={styles}>
        <TextField
            id="email"
            label="Email"
            value={email}
            type="email"
            placeholder="mario.rossi@gmail.com"
            variant="outlined"
            onChange={onEmailChange}
            fullWidth
            required
        />
        <TextField
            id="password"
            label="Password"
            value={password}
            type="password"
            placeholder="your password"
            margin="normal"
            variant="outlined"
            onChange={onPasswordChange}
            fullWidth
            required
        />
        <Fade in={!!error}>
            <Typography
                color="error"
                variant="subtitle1"
            >{I18n.t.loginPage[error]}</Typography>
        </Fade>
    </div>
);

export default LoginCardBoxForm;