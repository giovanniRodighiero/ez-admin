import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import GlobalContext from './components/GlobalContext';
import AuthenticatedRoute from './components/AuthenticatedRoute';
// import './App.css';

// import TopBar from './components/TopBar';
// import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import MainContentLayout from './components/MainContentLayout';
import Notification from './components/Notification';

import Login from './containers/Login';
import DashboardPage from './containers/Dashboard';
import UserListPage from './containers/UserList';
import UserNewPage from './containers/UserNew';
import UserUpdatePage from './containers/UserUpdate';
import ProfilePage from './containers/Profile';
import SettingsPage from './containers/Settings';
import PagesHomepage from './containers/PagesHomepage';

import { auth } from './config';


const Dashboard = AuthenticatedRoute(props => <DashboardPage { ...props } />);
const UserList = AuthenticatedRoute(props => <UserListPage { ...props } />);
const UserNew = AuthenticatedRoute(props => <UserNewPage { ...props } />);
const UserUpdate = AuthenticatedRoute(props => <UserUpdatePage { ...props } />);
const Settings = AuthenticatedRoute(props => <SettingsPage { ...props } />);
const Profile = AuthenticatedRoute(props => <ProfilePage { ...props } />);
const Homepage = AuthenticatedRoute(props => <PagesHomepage { ...props } />)

class App extends React.Component {
    state = {
        user: {
            accountConfirmed: true,
            email: "info@crispybacon.it",
            role: 100,
            _id: "555",
            fetched: false
        },
        notificationOpen: false,
        notificationMessage: '',
        notificationType: 'success',
    }

    constructor (props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setUser = this.setUser.bind(this);

        this.setNotification = this.setNotification.bind(this);
        this.dismissNotification = this.dismissNotification.bind(this);

        this.state.login = this.login;
        this.state.logout = this.logout;
        this.state.setUser = this.setUser;
        this.state.hasAccessToken = this.hasAccessToken;

        this.state.setNotification = this.setNotification;
        this.state.dismissNotification = this.dismissNotification;
    }


    render () {
        return (
            <GlobalContext.Provider value={this.state}>
                <Router>
                    <React.Fragment>
                        <Notification
                            open={this.state.notificationOpen}
                            dismissNotification={this.dismissNotification}
                            message={<span id="message-id">{this.state.notificationMessage}</span>}
                            type={this.state.notificationType}
                        />
                        <Route
                            exact
                            render={ ({ location }) => location.pathname !== '/login'
                                ? <Navigation user={this.state.user} />
                                : null
                            }
                        />
                        <MainContentLayout>
                            <Switch>
                                <Dashboard path="/" exact />
                                <UserList path="/users" exact />
                                <UserNew path="/users/new" exact />
                                <UserUpdate path="/users/:id" exact />
                                <Settings path="/settings" exact />
                                <Route path="/login" component={Login} />
                                <Profile path="/profile" exact />
                                <Homepage path="/pages/homepage" exact />
                                <Route path="*" render={props => <Redirect to="/" {...props} />} />
                            </Switch>
                        </MainContentLayout>
                    </React.Fragment>
                </Router>
            </GlobalContext.Provider>
        );
    }

    login ({ token, user }) {
        if (token)
            window.localStorage.setItem(auth.localStorageKey, token);
        this.setState({ user });
    }

    logout () {
            window.localStorage.removeItem(auth.localStorageKey);
        this.setState({ user: false });
    }

    setUser (user) {
        console.log(user);
        this.setState({ user: { ...user, fetched: true } });
    }

    hasAccessToken () {
        return !!window.localStorage.getItem(auth.localStorageKey);
    }

    setNotification ({ notificationMessage, notificationType }) {
        this.setState({ notificationOpen: true, notificationMessage, notificationType });
    }

    dismissNotification () {
        this.setState({ notificationOpen: false, notificationMessage: '' });
    }

}

export default App;
