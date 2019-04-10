import React from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import { MdFileUpload } from 'react-icons/md';

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

    state = {
        loading: false,
        fileuploaded: false
    }

    constructor (props) {
        super(props);

        this.onFileSelected = this.onFileSelected.bind(this);
    }

    render () {
        const { classes, image, id, index = 0, required = false } = this.props;

        return (
            <FormLabel htmlFor={`fileupload-${id}-${index}`} className={classes.imageContainer}>
                { this.state.loading && <MdFileUpload size="30px" /> }
                { !this.state.loading && (
                    <React.Fragment>
                        <input
                            accept="image/*"
                            style={{ opacity: '0' }}
                            id={`fileupload-${id}-${index}`}
                            onChange={this.onFileSelected}
                            type="file"
                            name={`fileupload-${id}-${index}`}
                            value={this.state.filename}
                            required={required && !this.state.fileuploaded && !image}
                        />
                        <span className={classes.imageLabel}>{I18n.t.generic.upload}</span>
                        <img
                            src={image || '/placeholder-img.png'}
                            className={classes.image}
                        />
                    </React.Fragment>
                )}
            </FormLabel>
        );
    }

    async onFileSelected (event) {
        this.setState({ loading: true });
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const { url } = await Api.post(UPLOAD_PATH, formData, {
            headers: { 'Content-Type': 'multipart/form-data'}
        });
        this.props.onImageUploaded(url, _ => this.setState({ loading: false, fileuploaded: true }));
    }
};

export default withStyles(styles)(FieldUpload);