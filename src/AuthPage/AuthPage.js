import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import userActions from "../_actions/user.actions";

const styles = {
    page: {
        background: "#2B3E50",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start"
    },
    card: {
        width: 1100,
        background: "#4E5D6C",
        marginTop: "5%",
        textAlign: "center",
        padding: 24
    },
    button: {
        color: "#5cb85c",
        border: "1px solid #5cb85c",
        margin: 12
    },
    text: {
        color: "#ebebeb",
        fontFamily: "Lato",
        fontWeight: 100
    },
    dialog: {
        alignItems: "start"
    }
};


class AuthPage extends React.Component {
    state = {
        loginDialog: false,
        registerDialog: false,
        tab: 0,
        login: {
            email: "",
            password: ""
        },
        hitchhiker: {
            firstName: "",
            lastName: "",
            email_hitchhiker: "",
            password_hitchhiker: ""
        },
        driver: {
            firstName: "",
            lastName: "",
            email_driver: "",
            password_driver: "",
            vehicleName: "",
            vehicleId: ""
        }
    };

    handleLogin = () => {
        const { login: {email, password} } = this.state;
        this.props.login(email, password);
    };

    handleRegister = () => {
        const {hitchhiker, driver, tab} = this.state;
        if(tab === 0)
            this.props.register(hitchhiker);
        else
            this.props.register(driver);
    };

    handleOpen = name => () => {
        this.setState({[name]: true});
    };

    handleClose = name => () => {
        this.setState({[name]: false});
    };

    handleTabChange = (event, tab) => {
        this.setState({tab});
    };

    handleChange = type => name => event => {
        event.persist();
        this.setState(prevState => ({
            [type]: {
                ...prevState[type],
                [name]: event.target.value
            }
        }));
    };

    render() {
        const {classes} = this.props;
        const {login, loginDialog, registerDialog, tab, hitchhiker, driver } = this.state;
        console.log(classes.button);

        return (
            <div className={classes.page}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="display3" gutterBottom className={classes.text}>
                            Welcome to Hitch A Ride!
                        </Typography>
                        <Typography variant="title" gutterBottom className={classes.text}>
                            This is a simple app to help people find a ride in Lviv.
                        </Typography>
                        <Typography variant="subheading" gutterBottom className={classes.text}>
                            To get a ride please
                            <Button variant="outlined" className={classes.button}
                                    onClick={this.handleOpen('loginDialog')}>
                                Login
                            </Button> or
                            <Button variant="outlined" className={classes.button}
                                    onClick={this.handleOpen('registerDialog')}>
                                Register
                            </Button>
                        </Typography>

                    </CardContent>
                </Card>
                <LoginForm
                    email={login.email}
                    password={login.password}
                    handleClose={this.handleClose('loginDialog')}
                    handleChange={this.handleChange}
                    open={loginDialog}
                    handleLogin={this.handleLogin}
                />
                <RegisterForm
                    handleClose={this.handleClose('registerDialog')}
                    handleChange={this.handleChange}
                    handleTabChange={this.handleTabChange}
                    tab={tab}
                    open={registerDialog}
                    hitchhiker={hitchhiker}
                    driver={driver}
                    handleRegister={this.handleRegister}
                />
            </div>
        );
    }
}

AuthPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, {login: userActions.login, register: userActions.register})(AuthPage));
