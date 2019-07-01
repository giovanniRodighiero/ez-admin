import React, { useState } from 'react';

import NavigationSideBar from './NavBar';
import NavigationTopBar from './TopBar';

function Navigation (props) {

    const [ open, setOpen ] = useState(false);

    return (
        <React.Fragment>
            <NavigationTopBar
                email={props.user.email}
                onOpen={_ => setOpen(true)}
            />
            <NavigationSideBar
                open={open}
                onClose={_ => setOpen(false)}
            />
        </React.Fragment>
    )
};

export default Navigation;