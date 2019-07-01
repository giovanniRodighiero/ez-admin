import React from 'react';
import { Grid, FormLabel } from '@material-ui/core';

import GroupSection from './GroupSection';
import FieldBlocks from './FieldBlocks';
import FieldInput from './FieldInput';
import FieldUpload from './FieldUpload';
import Draggable from './Draggable';

import I18n from '../config/I18n';

export default ({
    cardTitle = I18n.t.homepage.services.cardTitle,
    cardSubtitle = I18n.t.homepage.services.cardSubtitle,
    services = {},
    onImageUploaded,
    onServiceChange,
    onAddServiceItem,
    onRemoveServiceItem,
    onChangeServiceItem,
    onMoveServiceItem
}) => (
        <GroupSection
            title={cardTitle}
            subtitle={cardSubtitle}
        >
            <Grid item xs={12}>
                <FieldInput
                    required
                    multiline
                    id="title"
                    label={I18n.t.homepage.services.title}
                    name="title"
                    value={services.title}
                    onChange={onServiceChange}
                    type="text"
                    margin="normal"
                    rowsMax="4"
                />
            </Grid>
            <FieldBlocks
                blocks={services.items}
                onAddBlock={onAddServiceItem}
                onRemoveBlock={onRemoveServiceItem}
                buttons={[{
                    type: 'service',
                    name: 'Servizio',
                    color: 'primary'
                }]}
                render={(block, index) => (
                    <Draggable
                        item
                        sm={12}
                        moveBlock={onMoveServiceItem}
                        index={index}
                    >
                        <Grid container alignItems="center">
                            <Grid item xs={12}>
                                <FieldInput
                                    required
                                    id="service-title"
                                    label={I18n.t.homepage.services.itemsTitle}
                                    name="title"
                                    value={block.title}
                                    onChange={onChangeServiceItem(index)}
                                    type="text"
                                    margin="normal"
                                    multiline
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FieldInput
                                    required
                                    id="service-description"
                                    label={I18n.t.homepage.services.itemsDescription}
                                    name="description"
                                    value={block.description}
                                    onChange={onChangeServiceItem(index)}
                                    type="text"
                                    margin="normal"
                                    multiline
                                />
                            </Grid>


                            <Grid item md={3}>
                                <FormLabel>{I18n.t.homepage.services.itemsImage}</FormLabel>
                            </Grid>
                            <Grid item md={9}>
                                <FieldUpload
                                    required
                                    name="image"
                                    id="itemsImage"
                                    index={index}
                                    image={block.image}
                                    onImageUploaded={onImageUploaded(index)}
                                />
                            </Grid>

                        </Grid>
                    </Draggable>
                )}
            />

        </GroupSection>
    );