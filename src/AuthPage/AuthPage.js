import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
    return <Slide direction="down" {...props} timeout={500} />;
}

class AuthPage extends React.Component {
    state = {
        loginDialog: false,
        registerDialog: false,
    };

    handleOpen = name => () => {
        this.setState({[name]: true});
    };

    handleClose = name => () => {
        this.setState({[name]: false});
    };

    render() {
        const {classes} = this.props;
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
                <Dialog
                    open={this.state.loginDialog}
                    TransitionComponent={Transition}
                    className={classes.dialog}
                    keepMounted
                    onClose={this.handleClose('loginDialog')}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose('loginDialog')} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose('loginDialog')} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AuthPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthPage);
