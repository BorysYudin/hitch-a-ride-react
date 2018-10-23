import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import {DirectionsRenderer, Marker, Polyline, MarkerWithLabel} from "react-google-maps";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";


import {getUserTrip, getSuggestedTrips, getSuggestedTripsById} from "../_reducers";
import mapActions from "../_actions/map.actions";
import Header from "../_components/general/Header";
import TripCard from "../_components/map/TripCard";
import MapComponent from "../_components/map/MapComponent";
import MarkerA from "../static/img/marker-a.svg";
import MarkerB from "../static/img/marker-b.svg";
import {createRide} from '../_actions/map.actions';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    root: {
        height: "100vh",
        overflow: "hidden"
    },
    page: {
        maxWidth: 1700,
        margin: "0 auto",
        padding: "24px"
    },
    scrollableParent: {
        height: "90vh",
        overflow: "hidden",
        paddingBottom: 50
    },
    scrollable: {
        height: "100%",
        overflow: "scroll",
        marginRight: -50,
        paddingRight: 50,
        overflowY: "scroll"
    },
    button: {
        color: "#fff",
        background: "#DF691A",
        "&:hover": {
            background: "#DF691A",
            opacity: 0.9
        }
    },
    title: {
        margin: "0 0 24px"
    }
};

class TripDetailsPage extends React.Component {
    state = {
        selectedTrip: null
    };

    handleTripSelect = id => this.setState({selectedTrip: id});

    componentDidMount() {
        this.props.getUserTrips();
        this.props.getSuggestedTrips();
    }

    createRide = () => {
        const {selectedTrip} = this.state;
        const {trip, createRide} = this.props;

        createRide({
            hitchhiker_trip_id: selectedTrip,
            driver_trip_id: trip.id
        });
    };

    render() {
        const {selectedTrip} = this.state;
        const {trip, suggestedTrips, classes, suggestedTripsById} = this.props;

        const route = trip && JSON.parse(trip.route);
        const date = trip && moment.unix(trip.departure).format("DD/MM/YYYY");
        const time = trip && moment.unix(trip.departure).format("HH:mm a");

        let mapChildren = [];

        if (selectedTrip !== null) {
            const trip = suggestedTripsById[selectedTrip];
            const route = trip && JSON.parse(trip.route);

            mapChildren.push(
                <React.Fragment>
                    <Marker
                        position={{
                            lat: route.request.origin.location.lat,
                            lng: route.request.origin.location.lng
                        }}
                        options={{icon: MarkerA}}
                    />
                    <Marker
                        position={{
                            lat: route.request.destination.location.lat,
                            lng: route.request.destination.location.lng
                        }}
                        options={{icon: MarkerB}}
                    />
                    <Polyline
                        path={route.routes[0].overview_path}
                        key="selected-route"
                        geodesic={true}
                        options={{
                            strokeColor: "red",
                            strokeOpacity: 0.8,
                            strokeWeight: 5,
                            clickable: true
                        }}
                    />
                </React.Fragment>
            );
        }

        if (route) {
            for (let i = 0; i < route.routes.length; i++) {
                mapChildren.push(
                    <DirectionsRenderer
                        key={i}
                        directions={route}
                        routeIndex={i}
                    />
                );
            }
        }

        return (
            <div className={classes.root}>
                <Header/>
                <Grid container className={classes.page} alignItems="flex-start">
                    <Grid item xs={4} container>
                        <Grid item xs={12}>
                            <Typography variant="title" className={classes.title}>
                                Your trip
                            </Typography>
                        </Grid>
                        {trip && <Grid item><TripCard route={route} date={date} time={time}/></Grid>}
                    </Grid>
                    <Grid item xs={4} container className={classes.scrollableParent}>
                        <Grid item>
                            <Typography variant="title" className={classes.title}>
                                Suggested trips
                            </Typography>
                        </Grid>
                        <Grid item container className={classes.scrollable} spacing={24}>
                            {
                                suggestedTrips.map(trip => {
                                    const route = trip && JSON.parse(trip.route);
                                    const date = trip && moment.unix(trip.departure).format("DD/MM/YYYY");
                                    const time = trip && moment.unix(trip.departure).format("HH:mm a");

                                    return (
                                        <Grid item xs={12} key={trip.id} className={classes.selectedRoute}>
                                            <TripCard
                                                route={route}
                                                date={date}
                                                time={time}
                                                onClick={() => this.handleTripSelect(trip.id)}
                                                selected={trip.id === selectedTrip}
                                            />
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={4} container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="title">
                                Result Ride
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MapComponent
                                loadingElement={<div style={{height: `100%`}}/>}
                                containerElement={<div style={{height: `500px`, width: "100%"}}/>}
                                mapElement={<div style={{height: `100%`}}/>}
                            >
                                {mapChildren}
                            </MapComponent>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "right"}}>
                            <Button
                                variant="contained"
                                className={classes.button}
                                disabled={selectedTrip === null}
                                onClick={this.createRide}
                            >
                                Create Ride
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    trip: getUserTrip(state, props.match.params.id),
    suggestedTrips: getSuggestedTrips(state),
    suggestedTripsById: getSuggestedTripsById(state)
});

export default connect(mapStateToProps, {
    getSuggestedTrips: mapActions.getSuggestedTrips,
    getUserTrips: mapActions.getUserTrips,
    createRide: mapActions.createRide,
})(withStyles(styles)(TripDetailsPage));
