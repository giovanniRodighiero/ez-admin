import React from 'react';
import { Grid, FormLabel } from '@material-ui/core';

import GroupSection from './GroupSection';
import FieldUpload from './FieldUpload';
import FieldInput from './FieldInput';
import FieldWysiwyg from './FieldWysiwyg';

import I18n from '../config/I18n';

export default ({
    cardTitle = I18n.t.homepage.hero.cardTitle,
    cardSubtitle = I18n.t.homepage.hero.cardSubtitle,
    onImageUploaded,
    hero = {},
    onHeroChange,
    onRichEditorUpdate
}) => (
    <GroupSection
        title={cardTitle}
        subtitle={cardSubtitle}
    >
        <Grid container alignItems="center">
            <Grid item md={3}>
                <FormLabel>{I18n.t.homepage.hero.imageDesktop}</FormLabel>
            </Grid>
            <Grid item md={9}>
                <FieldUpload
                    name="imageDesktop"
                    image={hero.imageDesktop}
                    onImageUploaded={onImageUploaded({ prefix: 'hero', fieldName: 'imageDesktop' })}
                />
            </Grid>

            <Grid item md={3}>
                <FormLabel>{I18n.t.homepage.hero.imageMobile}</FormLabel>
            </Grid>
            <Grid item md={9}>
                <FieldUpload
                    name="imageMobile"
                    image={hero.imageMobile}
                    onImageUploaded={onImageUploaded({ prefix: 'hero', fieldName: 'imageMobile'})}
                />
            </Grid>

            <Grid item md={12} sm={12}>
                <FieldInput
                    required
                    id="title"
                    label={I18n.t.homepage.hero.title}
                    name="title"
                    value={hero.title}
                    onChange={onHeroChange}
                    type="text"
                    margin="normal"
                />
            </Grid>
            <Grid item md={12} sm={12}>
                <FieldInput
                    required
                    id="subtitle"
                    label={I18n.t.homepage.hero.subtitle}
                    name="subtitle"
                    value={hero.subtitle}
                    onChange={onHeroChange}
                    type="text"
                    margin="normal"
                />
            </Grid>
            <Grid item md={12} sm={12}>
                <FieldWysiwyg
                    value={hero.description}
                    onChange={onRichEditorUpdate({ prefix: 'hero', fieldName: 'description'})}
                />
                {/* <FieldInput
                    required
                    multiline
                    id="description"
                    label={I18n.t.homepage.hero.description}
                    name="description"
                    value={hero.description}
                    onChange={onHeroChange}
                    type="text"
                    margin="normal"
                /> */}
            </Grid>

        </Grid>
    </GroupSection>
);