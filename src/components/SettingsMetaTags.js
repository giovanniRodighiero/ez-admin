import React from 'react';
import { Grid, FormLabel } from '@material-ui/core';

import GroupSection from './GroupSection';
import FieldInput from './FieldInput';
import FieldUpload from './FieldUpload';

import I18n from '../config/I18n';

const SettingsMetaTags = ({
    meta = {},
    onMetaChange,
    onImageUploaded
}) => (
        <GroupSection
            title={I18n.t.settings.metaTags}
            subtitle={I18n.t.settings.metaTagsSubtitle}
        >
            <Grid container spacing={16} alignItems="center">
                <Grid item md={3}>
                    <FormLabel>{I18n.t.settings.image}</FormLabel>
                </Grid>
                <Grid item md={9}>
                    <FieldUpload
                        image={meta.image}
                        onImageUploaded={onImageUploaded}
                    />
                </Grid>

                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="title"
                        label="Meta Title"
                        name="title"
                        value={meta.title}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        multiline
                        id="description"
                        label="Meta Description"
                        name="description"
                        value={meta.description}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                        rowsMax="4"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={16}>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="ogUrl"
                        label="Open graph url"
                        name="ogUrl"
                        value={meta.ogUrl}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="twitterUrl"
                        label="Twitter url"
                        name="twitterUrl"
                        value={meta.twitterUrl}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={16}>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="ogTitle"
                        label="Open graph title"
                        name="ogTitle"
                        value={meta.ogTitle}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="twitterTitle"
                        label="Twitter title"
                        name="twitterTitle"
                        value={meta.twitterTitle}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={16}>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="ogDescription"
                        label="Open graph description"
                        name="ogDescription"
                        value={meta.ogDescription}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <FieldInput
                        required
                        id="twitterDescription"
                        label="Twitter description"
                        name="twitterDescription"
                        value={meta.twitterDescription}
                        onChange={onMetaChange}
                        type="text"
                        margin="normal"
                    />
                </Grid>
            </Grid>
        </GroupSection>
    );

export default SettingsMetaTags;