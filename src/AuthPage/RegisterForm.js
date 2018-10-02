import React from "react";

import {withStyles} from '@material-ui/core/styles';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const styles = {
    button: {
        color: "#fff",
        background: "#DF691A",
        margin: "0 16px",
        "&:hover": {
            background: "#DF691A",
            opacity: 0.9
        }
    },
    text: {
        color: "#ebebeb",
        fontFamily: "Lato",
        fontWeight: 100
    },
    dialog: {
        alignItems: "start"
    },
    dialogRoot: {
        minWidth: 500
    },
    margin: {
        margin: 8,
    },
    inputRoot: {
        'label + &': {
            marginTop: 24,
        },
    },
    input: {
        borderRadius: 4,
        backgroundColor: "#fff",
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '8px 12px',
        // transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),

    },
    formLabel: {
        fontSize: 18,
        color: "#fff"
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        padding: "0 12px",
        background: "#4E5D6C"
    },
    dialogActions: {
        background: "#4E5D6C",
        margin: 0,
        padding: "8px 4px"
    },
    title: {
        background: "#4E5D6C",
        opacity: 0.75,
        padding: "20px 24px 16px",
        "& h2": {
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
        }
    },
    cancelButton: {
        color: "#fff",
        padding: 0
    }
};

function Transition(props) {
    return <Slide direction="down" {...props} timeout={300}/>;
}

class LoginForm extends React.Component {
    render() {
        const {
            email, password, handleClose, classes, open,
            handleChange, tab, handleTabChange, firstName, lastName, vehicleName, vehicleId
        } = this.props;

        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                className={classes.dialog}
                classes={{paper: classes.dialogRoot}}
                keepMounted
                onClose={this.handleClose}
            >
                <DialogTitle className={classes.title}>
                    Register
                    <IconButton className={classes.cancelButton}>
                        <ClearIcon fontSize="small" onClick={handleClose}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Tabs value={tab} onChange={handleTabChange}>
                        <Tab label="Hitchhiker"/>
                        <Tab label="Driver"/>
                    </Tabs>
                    {tab === 0 &&
                    <React.Fragment>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="firstName" className={classes.formLabel}>
                                First name
                            </InputLabel>
                            <InputBase
                                id="firstName"
                                value={firstName}
                                onChange={handleChange('register')('firstName')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="lastName" className={classes.formLabel}>
                                Last name
                            </InputLabel>
                            <InputBase
                                id="lastName"
                                value={lastName}
                                onChange={handleChange('register')('lastName')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="email" className={classes.formLabel}>
                                Email
                            </InputLabel>
                            <InputBase
                                id="email"
                                value={email}
                                onChange={handleChange('register')('email')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="password" className={classes.formLabel}>
                                Password
                            </InputLabel>
                            <InputBase
                                id="password"
                                value={password}
                                onChange={handleChange('register')('password')}
                                type="password"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                    </React.Fragment>}
                    {tab === 1 &&
                    <React.Fragment>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="firstName" className={classes.formLabel}>
                                First name
                            </InputLabel>
                            <InputBase
                                id="firstName"
                                value={firstName}
                                onChange={handleChange('register')('firstName')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="lastName" className={classes.formLabel}>
                                Last name
                            </InputLabel>
                            <InputBase
                                id="lastName"
                                value={lastName}
                                onChange={handleChange('register')('lastName')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="email" className={classes.formLabel}>
                                Email
                            </InputLabel>
                            <InputBase
                                id="email"
                                value={email}
                                onChange={handleChange('register')('email')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="password" className={classes.formLabel}>
                                Password
                            </InputLabel>
                            <InputBase
                                id="password"
                                value={password}
                                onChange={handleChange('register')('password')}
                                type="password"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="vehicleName" className={classes.formLabel}>
                                Vehicle name
                            </InputLabel>
                            <InputBase
                                id="vehicleName"
                                value={vehicleName}
                                onChange={handleChange('register')('vehicleName')}
                                type="text"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="vehicleId" className={classes.formLabel}>
                                Vehicle id
                            </InputLabel>
                            <InputBase
                                id="vehicleId"
                                value={vehicleId}
                                onChange={handleChange('register')('vehicleId')}
                                type="text"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.input,
                                }}
                            />
                        </FormControl>
                    </React.Fragment>}
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleClose} variant="contained" className={classes.button}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(LoginForm);
