import React, { useState, useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import GlobalContext from './GlobalContext';

import Api from '../Api';

function AuthenticatedRoute (Component) {

    function useUserProfile (props) {
        const [ error, setError ] = useState(false);
        const context = useContext(GlobalContext);


        useEffect(_ => {
            async function fetchProfile () {
                if (context.hasAccessToken() && !context.user.fetched) {
                    try {
                        const result = await Api.getUserProfile();
                        context.setUser(result);
                    } catch (error) {
                        console.log(error);
                        setError(error);
                    }
                }
            }

            fetchProfile();
        }, [context]);

        if (!context.hasAccessToken())
            return <Route {...props} render={props => <Redirect to="/login" />} />;

        if (error) return <Redirect to="/login" />;
        if (!context.user.fetched) return <p>loading</p>;
        if (context.user.fetched) return <Route {...props} component={Component} />; 
    }

    return useUserProfile;

};

export default AuthenticatedRoute;