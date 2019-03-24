import React from 'react';

import ErrorsSection from '../components/ErrorsSection';
import PageTitle from '../components/PageTitle';
import UserForm from '../components/UserForm';

import GlobalContext from '../components/GlobalContext';
import I18n from '../config/I18n';
import Api from '../Api';

const API_PATH = '/api/v1/users';

class UserNew extends React.Component {

    availableRoles = [70, 80, 90, 100];

    state = {
        email: '',
        role: 70,
        errorCode: false
    }

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount () {
        const { id } = this.props.match.params;
        try {
            const user = await Api.get(`${API_PATH}/${id}`);
            this.setState(user);
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
            <React.Fragment>
                <PageTitle backPath="/users">{I18n.t.users.updateUsersPageTitle}</PageTitle>
                <UserForm
                    {...this.state}
                    title={I18n.t.users.newUsersPersonalInfos}
                    onSave={this.onSave}
                    onInputChange={this.onInputChange}
                    availableRoles={this.availableRoles.filter(role => role <= this.context.user.role)}
                />
                
                {
                    this.state.errorCode && <ErrorsSection>{I18n.t.users.errors[this.state.errorCode]}</ErrorsSection>
                }
            </React.Fragment>
        );
    }

    onInputChange(event) {
        const { name, value } = event.target;

        if (name === 'email' && this.state.errorCode === 'already_existing')
            this.setState({ [name]: value, errorCode: false });
        else
            this.setState({ [name]: value });
    }

    async onSave(event) {
        event.preventDefault();

        const { id } = this.props.match.params;
        try {
            await Api.put(`${API_PATH}/${id}`, this.state);
            this.context.setNotification({
                notificationType: 'success',
                notificationMessage: I18n.t.users.notification.success
            });
            this.props.history.push('/users');
        } catch (error) {
            console.log(error);
            this.setState({ errorCode: error.response.data.code });
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.users.notification.error
            });
        }
    }

};

UserNew.contextType = GlobalContext;

export default UserNew;