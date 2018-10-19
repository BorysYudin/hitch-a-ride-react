import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import {DirectionsRenderer, Marker, Polyline, MarkerWithLabel} from "react-google-maps";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";


import {getTrip, getAllTrips, getAllById} from "../_reducers";
import mapActions from "../_actions/map.actions";
import Header from "../_components/general/Header";
import TripCard from "../_components/map/TripCard";
import MapComponent from "../_components/map/MapComponent";
import MarkerA from "../static/img/marker-a.svg";
import MarkerB from "../static/img/marker-b.svg";


const styles = {
    root: {
        maxWidth: 1700,
        margin: "0 auto",
        padding: "24px"
    },
    scrollable: {
        maxHeight: "90vh",
        overflow: "scroll"
    }
};

class TripDetailsPage extends React.Component {
    state = {
        selectedTrip: null
    };

    handleTripSelect = id => this.setState({selectedTrip: id});

    componentDidMount() {
        this.props.getUserTrips();
    }

    render() {
        const {selectedTrip} = this.state;
        const {trip, allTrips, classes, allTripsById} = this.props;

        const route = trip && JSON.parse(trip.route);
        const date = trip && moment.unix(trip.departure).format("DD/MM/YYYY");
        const time = trip && moment.unix(trip.departure).format("HH:mm a");

        let mapChildren = [];

        if (selectedTrip !== null) {
            const trip = allTripsById[selectedTrip];
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
            <div>
                <Header/>
                <Grid container className={classes.root} alignItems="flex-start">
                    <Grid item xs={4} container>
                        {trip && <TripCard route={route} date={date} time={time}/>}
                    </Grid>
                    <Grid item xs={4} container>
                        <Grid item container className={classes.scrollable} spacing={24}>
                            {
                                allTrips.map(trip => {
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
                    <Grid item xs={4} container>
                        <MapComponent
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={<div style={{height: `500px`, width: "100%"}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                        >
                            {mapChildren}
                        </MapComponent>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    trip: getTrip(state, props.match.params.id),
    allTrips: getAllTrips(state),
    allTripsById: getAllById(state)
});

export default connect(mapStateToProps, {getUserTrips: mapActions.getUserTrips})(withStyles(styles)(TripDetailsPage));
