import React from 'react';
import { MdSave } from 'react-icons/md';

import PageTitle from '../components/PageTitle';
import SettingsMetaTags from '../components/SettingsMetaTags';
import FloatingButton from '../components/FloatingButton';

import I18n from '../config/I18n';
import Api from '../Api';
import GlobalContext from '../components/GlobalContext';

const API_PATH = '/api/v1/settings';
const UPLOAD_PATH = '/api/v1/uploader';

class Settings extends React.Component {

    state = {
        meta: {
            image: '',
            title: '',
            description: '',

            ogUrl: '',
            ogTitle: '',
            ogDescription: '',

            twitterUrl: '',
            twitterTitle: '',
            twitterDescription: '',
        }
    }

    constructor (props) {
        super(props);

        this.onMetaChange = this.onMetaChange.bind(this);
        this.onImageUploaded = this.onImageUploaded.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount () {
        try {
            const settings = await Api.get(API_PATH);
            this.setState({ meta: settings.meta });
        } catch (error) {
            console.log(error);
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
        }
    }

    render () {
        return (
            <form style={{ width: '100%' }} onSubmit={this.onSave}>
                <PageTitle>{I18n.t.settings.pageTitle}</PageTitle>

                <SettingsMetaTags
                    meta={this.state.meta}
                    onMetaChange={this.onMetaChange}
                    onImageUploaded={this.onImageUploaded}
                />

                <FloatingButton type="submit">
                    <MdSave size="28px" />
                </FloatingButton>
            </form>
        );
    }

    onMetaChange (event) {
        const { name, value } = event.target;
        this.setState(prevState => ({ meta: { ...prevState.meta, [name]: value } }));
    }

    async onImageUploaded (image) {
        this.setState(prevState => ({ meta: { ...prevState.meta, image } }));
    }

    async onSave (event) {
        event.preventDefault();

        try {
            const newSettings = await Api.put(API_PATH, this.state);
            this.setState({ meta: newSettings.meta });
            this.context.setNotification({
                notificationType: 'success',
                notificationMessage: I18n.t.settings.notification.success
            });
        } catch (error) {
            console.log(error);
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
        }
    }
};

Settings.contextType = GlobalContext;

export default Settings;