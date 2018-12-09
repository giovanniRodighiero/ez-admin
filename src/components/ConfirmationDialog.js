import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from '@material-ui/core';

import I18n from '../config/I18n';

const ConfirmationDialog = ({ confirmDialogOpen = false, onConfirmDialogClose, I18nKey, whatToDelete = '' }) => (
    <Dialog 
        open={confirmDialogOpen}
        onClose={onConfirmDialogClose}
    >
        <DialogTitle id="form-dialog-title">{I18n.t[I18nKey].delete.title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{I18n.t[I18nKey].delete.text} {whatToDelete}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onConfirmDialogClose}>{I18n.t[I18nKey].delete.cancel}</Button>
            <Button color="secondary" variant="outlined">{I18n.t[I18nKey].delete.confirm}</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationDialog;