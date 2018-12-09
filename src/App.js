import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import UserContext from './components/UserContext';
import NotificationContext from './components/NotificationContext';
import AuthenticatedRoute from './components/AuthenticatedRoute';
// import './App.css';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import MainContentLayout from './components/MainContentLayout';
import Notification from './components/Notification';

import Login from './containers/Login';
import DashboardPage from './containers/Dashboard';
import UserListPage from './containers/UserList';

import { auth } from './config';


const Dashboard = AuthenticatedRoute(() => <DashboardPage />);
const UserList = AuthenticatedRoute(() => <UserListPage />);
const Settings = AuthenticatedRoute(() => <Link to="/dashboard">dashboard</Link>);

class App extends React.Component {
    state = {
        user: false,
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
            <UserContext.Provider value={this.state}>
                <NotificationContext.Provider value={this.state}>
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
                                render={ ({ location }) => location.pathname != '/login'
                                ? (<React.Fragment>
                                        <TopBar email={this.state.user.email} />
                                        <NavBar />
                                    </React.Fragment>)
                                : null }
                            />
                            <MainContentLayout>
                                <Switch>
                                    <Dashboard path="/" exact />
                                    <UserList path="/users" exact />
                                    <Settings path="/settings" exact />
                                    <Route path="/login" component={Login} />
                                    <Dashboard exact />
                                </Switch>
                            </MainContentLayout>
                        </React.Fragment>
                    </Router>
                </NotificationContext.Provider>
            </UserContext.Provider>
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
        console.log(user)
        this.setState({ user });
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
