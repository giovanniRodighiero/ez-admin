import React from 'react';
import { Grid } from '@material-ui/core';

import GroupSection from './GroupSection';
import FieldInput from './FieldInput';

import I18n from '../config/I18n';

export default ({
    defaultLang,
    onSettingChange
}) => (
    <GroupSection
        title={I18n.t.settings.generic}
    >
        <Grid container spacing={16}>
            <Grid item md={6} sm={12}>
                <FieldInput
                    select
                    required
                    id="lang"
                    label={I18n.t.settings.lang}
                    name="defaultLang"
                    value={defaultLang}
                    onChange={onSettingChange}
                    type="text"
                    margin="normal"
                    SelectProps={{ native: true }}
                >
                    {
                        ['it', 'en'].map(lang =>
                            <option value={lang} key={lang}>{I18n.t.settings.langs[lang]}</option>)
                    }
                </FieldInput>
            </Grid>
        </Grid>
    </GroupSection>
);