import React, { useState } from 'react';
import { FormLabel } from '@material-ui/core';
import { MdFileUpload } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';

import Api from '../Api';
import I18n from '../config/I18n';

const UPLOAD_PATH = '/api/v1/uploader';

const useStyles = makeStyles(theme => ({
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

}));

function FieldUpload ({ image, id, index = 0, required = false, filename, onImageUploaded }) {

    const [ loading, setLoading ] = useState(false);
    const [ fileuploaded, setFileuploaded ] = useState(false);
    const classes = useStyles();

    async function onFileSelected (event) {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const { url } = await Api.post(UPLOAD_PATH, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        onImageUploaded(url, _ => {
            setLoading(false);
            setFileuploaded(true);
        });
    }

    return (
        <FormLabel htmlFor={`fileupload-${id}-${index}`} className={classes.imageContainer}>
            { loading && <MdFileUpload size="30px" /> }
            { !loading && (
                <React.Fragment>
                    <input
                        accept="image/*"
                        style={{ opacity: '0' }}
                        id={`fileupload-${id}-${index}`}
                        onChange={onFileSelected}
                        type="file"
                        name={`fileupload-${id}-${index}`}
                        value={filename}
                        required={required && !fileuploaded && !image}
                    />
                    <span className={classes.imageLabel}>{I18n.t.generic.upload}</span>
                    <img
                        src={image || '/placeholder-img.png'}
                        className={classes.image}
                        alt={id}
                    />
                </React.Fragment>
            )}
        </FormLabel>
    );

}

export default FieldUpload;