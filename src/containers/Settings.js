import React from 'react';
import { MdSave } from 'react-icons/md';

import PageTitle from '../components/PageTitle';
import SettingsGeneric from '../components/SettingsGenerals';
import FloatingButton from '../components/FloatingButton';

import I18n from '../config/I18n';
import Api from '../Api';
import GlobalContext from '../components/GlobalContext';

const API_PATH = '/api/v1/settings';

class Settings extends React.Component {

    state = {
        defaultLang: ''
    }

    constructor (props) {
        super(props);

        this.onSettingChange = this.onSettingChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount () {
        try {
            const settings = await Api.get(API_PATH);
            this.setState(settings);
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

                <SettingsGeneric
                    {...this.state}
                    onSettingChange={this.onSettingChange}
                />
                <FloatingButton type="submit">
                    <MdSave size="28px" />
                </FloatingButton>
            </form>
        );
    }

    onSettingChange (event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async onSave (event) {
        event.preventDefault();

        try {
            const settings = await Api.put(API_PATH, this.state);
            this.setState(settings);
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