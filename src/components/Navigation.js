import React from 'react';

import NavigationSideBar from './NavBar';
import NavigationTopBar from './TopBar';

class Navigation extends React.Component {

    state = {
        open: false
    }

    constructor (props) {
        super(props);

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    render () {
        return (
            <React.Fragment>
                <NavigationTopBar
                    email={this.props.user.email}
                    onOpen={this.onOpen}
                />
                <NavigationSideBar
                    open={this.state.open}
                    onClose={this.onClose}
                />
            </React.Fragment>
        )
    }

    onClose () {
        this.setState({ open: false });
    }

    onOpen () {
        this.setState({ open: true });
    }
};

export default Navigation;