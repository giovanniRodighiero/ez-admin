import React from 'react';
import { Grid } from '@material-ui/core';
import { MdSave } from 'react-icons/md';

import GroupSection from './GroupSection';
import InputField from './InputField';
import FloatingButton from './FloatingButton';

import I18n from '../config/I18n';

export default ({
    title = '',
    onSave,
    email,
    role,
    onInputChange,
    errorCode,
    availableRoles = []
}) => (
    <GroupSection title={title}>
        <form onSubmit={onSave}>
            <Grid container spacing={16}>
                <Grid item md={6} sm={12}>
                    <InputField
                        required
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        type="email"
                        margin="normal"
                        helperText={errorCode === 'already_existing' ? I18n.t.users.errors[this.state.errorCode] : ''}
                        error={errorCode === 'already_existing'}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <InputField
                        select
                        required
                        id="role"
                        label="Role"
                        name="role"
                        value={role}
                        onChange={onInputChange}
                        margin="normal"
                        SelectProps={{ native: true }}
                    >
                        {
                            availableRoles.map(role =>
                                <option value={role} key={role}>{I18n.t.users.roles[role]}</option>)
                        }
                    </InputField>
                </Grid>
            </Grid>


            <FloatingButton type="submit">
                <MdSave size="28px" />
            </FloatingButton>
        </form>
    </GroupSection>
);