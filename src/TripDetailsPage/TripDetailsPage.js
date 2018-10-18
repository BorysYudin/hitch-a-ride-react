import React from "react";
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";

import {getTrip} from "../_reducers";
import mapActions from "../_actions/map.actions";
import Header from "../_components/general/Header";


const styles = {

};

class TripDetailsPage extends React.Component {
    componentDidMount() {
        this.props.getUserTrips();
    }

    render() {
        const {match, classes} = this.props;
        return (
            <div>
                <Header/>
                <Grid container className={classes.root}>
                    <Grid item xs={12} container>
                        TripDetailsPage {match.params.id}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    trip: getTrip(state, props.match.params.id)
});

export default connect(mapStateToProps, {getUserTrips: mapActions.getUserTrips})(withStyles(styles)(TripDetailsPage));
