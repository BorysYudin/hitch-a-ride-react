import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import LoginForm from "./LoginForm";

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

function Transition(props) {
    return <Slide direction="down" {...props} timeout={300} />;
}

class AuthPage extends React.Component {
    state = {
        loginDialog: false,
        registerDialog: false,
        login: {
            email: "",
            password: ""
        }
    };

    handleOpen = name => () => {
        this.setState({[name]: true});
    };

    handleClose = name => () => {
        this.setState({[name]: false});
    };

    handleChange = type => name => event => {
        event.persist()
        this.setState(prevState => ({
            [type]: {
                ...prevState[type],
                [name]: event.target.value
            }
        }));
    };

    render() {
        const {classes} = this.props;
        const { login, loginDialog } = this.state;
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
                            <Button variant="outlined" className={classes.button} onClick={this.handleOpen('loginDialog')}>
                                Login
                            </Button> or
                            <Button variant="outlined" className={classes.button} onClick={this.handleOpen('loginDialog')}>
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
                />
            </div>
        );
    }
}

AuthPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthPage);
