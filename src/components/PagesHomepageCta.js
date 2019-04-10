import React from 'react';
import { Grid, FormLabel } from '@material-ui/core';

import GroupSection from './GroupSection';
import FieldUpload from './FieldUpload';
import FieldInput from './FieldInput';

import I18n from '../config/I18n';

export default ({
    cardTitle = I18n.t.homepage.cta.cardTitle,
    cardSubtitle = I18n.t.homepage.cta.cardSubtitle,
    cta = {},
    onCtaChange
}) => (
    <GroupSection
        title={cardTitle}
        subtitle={cardSubtitle}
    >
        <Grid container spacing={16}>

            <Grid item md={12} sm={12}>
                <FieldInput
                    required
                    id="cta-title"
                    label={I18n.t.homepage.cta.title}
                    name="title"
                    value={cta.title}
                    onChange={onCtaChange}
                    type="text"
                    margin="normal"
                />
            </Grid>

            <Grid item md={12} sm={12}>
                <FieldInput
                    required
                    id="cta-link"
                    label={I18n.t.homepage.cta.link}
                    name="link"
                    value={cta.link}
                    onChange={onCtaChange}
                    type="text"
                    margin="normal"
                />
            </Grid>
        
        </Grid>
    </GroupSection>
);