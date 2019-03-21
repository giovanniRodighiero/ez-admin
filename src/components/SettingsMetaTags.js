import React from 'react';
import { Grid } from '@material-ui/core';

import GroupSection from './GroupSection';
import InputField from './InputField';

import I18n from '../config/I18n';

export default ({
    meta = {},
    onMetaChange
}) => (
    <GroupSection
        title={I18n.t.settings.metaTags}
        subtitle={I18n.t.settings.metaTagsSubtitle}
    >
            <Grid container spacing={16}>
                <Grid item md={6} sm={12}>
                    <InputField
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
                    <InputField
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
                    <InputField
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
                    <InputField
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
                    <InputField
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
                    <InputField
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
                    <InputField
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
                    <InputField
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