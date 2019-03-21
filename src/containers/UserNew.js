import React from 'react';
import { Grid } from '@material-ui/core';
import { MdSave } from 'react-icons/md';

import GroupSection from '../components/GroupSection';
import InputField from '../components/InputField';
import FloatingButton from '../components/FloatingButton';
import ErrorsSection from '../components/ErrorsSection';
import PageTitle from '../components/PageTitle';

import NotificationContext from '../components/NotificationContext';
import I18n from '../config/I18n';
import Api from '../Api';

const API_PATH = '/api/v1/users';

class UserNew extends React.Component {

    availableRoles = [70, 80, 90];

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

    render() {
        return (
            <React.Fragment>
                <PageTitle backPath="/users">{I18n.t.users.newUsersPageTitle}</PageTitle>
                <GroupSection title={I18n.t.users.newUsersPersonalInfos}>
                    <form onSubmit={this.onSave}>
                        <Grid container spacing={16}>
                            <Grid item md={6} sm={12}>
                                <InputField
                                    required
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                    type="email"
                                    margin="normal"
                                    helperText={this.state.errorCode === 'already_existing' ? I18n.t.users.errors[this.state.errorCode] : ''}
                                    error={this.state.errorCode === 'already_existing'}
                                />
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <InputField
                                    select
                                    required
                                    id="role"
                                    label="Role"
                                    name="role"
                                    value={this.state.role}
                                    onChange={this.onInputChange}
                                    margin="normal"
                                    SelectProps={{ native: true }}
                                >
                                    {
                                        this.availableRoles.map(role =>
                                            <option value={role} key={role}>{I18n.t.users.roles[role]}</option>)
                                    }
                                </InputField>
                            </Grid>
                        </Grid>


                        <FloatingButton type="submit">
                            <MdSave size="28px" />
                        </FloatingButton>
                    </form>
                </GroupSection>
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

        try {
            await Api.post(API_PATH, this.state);
            this.context.setNotification({
                notificationType: 'success',
                notificationMessage: I18n.t.users.notification.success
            });
            this.props.history.push('/users');
        } catch (error) {
            console.log(error)
            this.setState({ errorCode: error.response.data.code });
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.users.notification.error
            });
        }
    }

};

UserNew.contextType = NotificationContext;

export default UserNew;