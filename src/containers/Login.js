import React, { useState, useContext, useEffect } from 'react';
import { CardContent, CardActions } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';

import Card from '../components/LoginCard';
import LoginCardBoxForm from '../components/LoginCardBoxForm';

import GlobalContext from '../components/GlobalContext';
import I18n from '../config/I18n';
import Api from '../Api';

const styles = {
    cardContent: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardBox: {
        flex: 1
    },
    cardActions: {
        justifyContent: 'flex-end'
    }
};

function Login (props) {

    const [ credentials, setCredentials ] = useState({ email: '', password: '' });
    const [ error, setError ] = useState(false);

    const context = useContext(GlobalContext);

    useEffect(_ => {
        if (context.hasAccessToken())
            props.history.push('/');
    });

    const onEmailChange = e => setCredentials({ ...credentials, email: e.target.value });
    const onPasswordChange = e => setCredentials({ ...credentials, password: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(false);

        try {
            const result = await Api.login(credentials);
            context.login(result);
        } catch ({ response }) {
            setError(response.data.code);
        }
    }

    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardContent style={styles.cardContent}>
                    <div style={styles.cardBox}>
                        <Typography
                            component="h1"
                            variant="h3"
                            gutterBottom
                        >{I18n.t.loginPage.title}</Typography>
                        <Typography variant="subtitle1">{I18n.t.loginPage.subtitle}</Typography>
                    </div>
                    <div style={styles.cardBox}>
                        <LoginCardBoxForm
                            {...credentials }
                            error={error}
                            onEmailChange={onEmailChange}
                            onPasswordChange={onPasswordChange}
                            onSubmit={onSubmit}
                        />
                    </div>
                </CardContent>
                <CardActions style={styles.cardActions}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >{I18n.t.loginPage.button}</Button>
                </CardActions>
            </form>
        </Card>
    )
};

export default Login;