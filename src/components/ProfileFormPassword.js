import React from 'react';
import { Button, Grid } from '@material-ui/core';

import GroupSection from './GroupSection';
import GroupSectionButtons from './GroupSectionButtons';
import FieldInput from './FieldInput';

import I18n from '../config/I18n';

export default ({
    password = '',
    confirmPassword = '',
    errorCode = '',
    onPasswordSave,
    onInputChange
}) => (
    <GroupSection title={I18n.t.profile.updatePassword}>
        <form onSubmit={onPasswordSave}>
            <Grid container>
                <Grid item sm={6}>
                    <FieldInput
                        required
                        id="password"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        type="password"
                        margin="normal"
                    />
                </Grid>
                <Grid item sm={6}>
                    <FieldInput
                        required
                        id="confirmPassword"
                        label="Confirm password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onInputChange}
                        type="password"
                        margin="normal"
                        error={errorCode === 'mismatch'}
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