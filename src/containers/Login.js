import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, CardActions } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';

import Card from '../components/LoginCard';
import LoginCardBoxForm from '../components/LoginCardBoxForm';

import UserContext from '../components/UserContext';
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


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        error: false
    }

    constructor (props) {
        super(props);

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate () {
        if (this.context.hasAccessToken()) {
            this.props.history.push('/');
        }
    }
    
    componentDidMount () {
        if (this.context.hasAccessToken()) {
            this.props.history.push('/');
        }
    }

    render () {
        return (
            <Card>
                <form onSubmit={this.onSubmit}>
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
                                {...this.state}
                                onEmailChange={this.onEmailChange}
                                onPasswordChange={this.onPasswordChange}
                                onSubmit={this.onSubmit}
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
        );
    }

    onEmailChange (event) {
        this.setState({ email: event.target.value, error: false });
    }

    onPasswordChange (event) {
        this.setState({ password: event.target.value, error: false });
    }

    async onSubmit (event) {
        event.preventDefault();
        this.setState({ error: false });

        try {
            const result = await Api.login({ email: this.state.email, password: this.state.password });
            this.context.login(result);
        } catch ({ response }) {
            this.setState({ error: response.data.code });
        }
    }
};

Login.contextType = UserContext;

export default Login;