import React from 'react';
import { Button, Grid } from '@material-ui/core';

import GroupSection from './GroupSection';
import GroupSectionButtons from './GroupSectionButtons';
import FieldInput from './FieldInput';

import I18n from '../config/I18n';

export default ({
    email = '',
    errorCode = '',
    onProfileSave,
    onInputChange,
}) => (
    <GroupSection title={I18n.t.profile.personalData}>
        <form onSubmit={onProfileSave}>
            <Grid container>
                <Grid item sm={6}>
                    <FieldInput
                        required
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        type="email"
                        margin="normal"
                        helperText={errorCode === 'already_existing' ? I18n.t.users.errors[errorCode] : ''}
                        error={errorCode === 'already_existing'}
                    />
                </Grid>
                <GroupSectionButtons>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                    >{I18n.t.profile.profileSave}</Button>
                </GroupSectionButtons>
            </Grid>
        </form>
    </GroupSection>
);