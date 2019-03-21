import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from './UserContext';

import Api from '../Api';

function AuthenticatedRoute (Component) {
    class WithUserProfile extends React.Component {

        state = {
            error: false
        }

        async componentDidMount () {
            if (!this.context.hasAccessToken()) return;

            if (this.context.user.fetched) return;

            try {
                const result = await Api.getUserProfile();
                this.context.setUser(result);
            } catch (error) {
                console.log(error);
            }
        }

        render () {
            if (!this.context.hasAccessToken())
                return <Route {...this.props} render={props => <Redirect to="/login" />} />;

            const { error } = this.state;
            const { user } = this.context;

            if (error) return <Redirect to="/login" />;
            if (!user.fetched) return <p>loading</p>;
            if (user.fetched) return <Route {...this.props} component={Component} />;
        }
    }

    WithUserProfile.contextType = UserContext;

    return WithUserProfile;
}


export default AuthenticatedRoute;