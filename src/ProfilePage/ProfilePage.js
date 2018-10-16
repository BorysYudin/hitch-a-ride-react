import React from "react";

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from '../_components/general/Header';


const styles = {};

class ProfilePage extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Header/>
                <Grid container className={classes.root}>
                    Profile page
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ProfilePage);
