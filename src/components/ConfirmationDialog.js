import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, Typography } from '@material-ui/core';

import I18n from '../config/I18n';

const ConfirmationDialog = ({ open = false, onClose, onConfirm, I18nKey, whatToDelete = '' }) => (
    <Dialog 
        open={open}
        onClose={onClose}
    >
        <DialogTitle id="form-dialog-title">{I18n.t[I18nKey].listDialog.title}</DialogTitle>
        <DialogContent>
            <DialogContentText
                gutterBottom
                variant="subtitle2"
                color="textPrimary"
            >{I18n.t[I18nKey].listDialog.text}</DialogContentText>
            <DialogContentText>{whatToDelete}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>{I18n.t[I18nKey].listDialog.cancel}</Button>
            <Button color="secondary" variant="outlined" onClick={onConfirm}>{I18n.t[I18nKey].listDialog.confirm}</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationDialog;