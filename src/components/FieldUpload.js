import React from 'react';
import { FormLabel, withStyles } from '@material-ui/core';

import Api from '../Api';
import I18n from '../config/I18n';

const UPLOAD_PATH = '/api/v1/uploader';

const styles = {
    imageContainer: {
        display: 'block',
        width: '100%',
        position: 'relative',
        textAlign: 'center',
        transition: 'opacity .25s ease-out',
        cursor: 'pointer',
        '&:hover': {
            '& > img': {
                opacity: '0.35',
            },
            '& > span': {
                opacity: '1'
            }
        }
    },
    image: {
        height: '150px'
    },
    imageLabel: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1',
        opacity: 0,
        color: 'black',
        transition: 'opacity .25s ease-out'
    }
};

class FieldUpload extends React.Component {

    render () {
        const { classes, image } = this.props;

        return (
            <FormLabel htmlFor="raised-button-file" className={classes.imageContainer}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    onChange={this.onFileSelected}
                    type="file"
                />
                <span className={classes.imageLabel}>{I18n.t.generic.upload}</span>
                <img
                    src={image || '/placeholder-img.png'}
                    className={classes.image}
                />
            </FormLabel>
        );
    }

    async onFileSelected (event) {
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const { url } = await Api.post(UPLOAD_PATH, formData, {
            headers: { 'Content-Type': 'multipart/form-data'}
        });
        this.props.onImageUploaded(url);
    }
};

export default withStyles(styles)(FieldUpload);