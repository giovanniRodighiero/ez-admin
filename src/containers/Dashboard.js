import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../components/UserContext';

class Dashboard extends React.Component {

    render () {
        return (
            <React.Fragment>
                <h1>Dashboard</h1>
                <Link to="/settings">settings</Link>
            </React.Fragment>
        );
    }
};

Dashboard.contextType = UserContext;

export default Dashboard;