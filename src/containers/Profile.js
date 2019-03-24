import React from 'react';

import PageTitle from '../components/PageTitle';
import ProfileFormInfos from '../components/ProfileFormInfos';
import ProfileFormPassword from '../components/ProfileFormPassword';

import I18n from '../config/I18n';
import Api from '../Api';
import GlobalContext from '../components/GlobalContext';

class Profile extends React.Component {

    state = {
        errorCode: false
    }

    constructor (props, context) {
        super(props);
        this.state.email = context.user.email;

        this.onInputChange = this.onInputChange.bind(this);
        this.onProfileSave = this.onProfileSave.bind(this);
        this.onPasswordSave = this.onPasswordSave.bind(this);
    }

    render () {
        return (
            <React.Fragment>
                <PageTitle>{I18n.t.profile.pageTitle}</PageTitle>

                <ProfileFormInfos
                    email={this.state.email}
                    errorCode={this.state.errorCode}
                    onInputChange={this.onInputChange}
                    onProfileSave={this.onProfileSave}
                />
                
                <ProfileFormPassword
                    password={this.state.password}
                    confirmPassword={this.state.confirmPassword}
                    errorCode={this.state.errorCode}
                    onPasswordSave={this.onPasswordSave}
                    onInputChange={this.onInputChange}
                />

            </React.Fragment>
        );
    }

    onInputChange (event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async onProfileSave (event) {
        event.preventDefault();

        const { email } = this.state;
        try {
            const result = await Api.updateMyProfileInfos({ email });
            this.context.setUser(result.user);
            this.context.setNotification({ notificationType: 'success', notificationMessage: I18n.t.profile.updatedSuccess });
        } catch (error) {
            this.setState({ errorCode: error.response.data.code });
            this.context.setNotification({ notificationType: 'error', notificationMessage: I18n.t.profile.updatedError });
        }
    }

    async onPasswordSave (event) {
        event.preventDefault();

        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword)
            this.setState({ errorCode: 'mismatch' });
        else {
            try {
                await Api.updateMyProfilePassword({ password, confirmPassword });
                this.context.setNotification({ notificationType: 'success', notificationMessage: I18n.t.profile.updatedSuccess });
                this.setState({ password: '', confirmPassword: '' });
            } catch (error) {
                this.setState({ errorCode: error.response.data.code });
                this.context.setNotification({ notificationType: 'error', notificationMessage: I18n.t.profile.updatedError });
            }
        }
    }
};

Profile.contextType = GlobalContext;

export default Profile;