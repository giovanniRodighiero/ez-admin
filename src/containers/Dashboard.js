import React from 'react';
import { Link } from 'react-router-dom';

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

export default Dashboard;