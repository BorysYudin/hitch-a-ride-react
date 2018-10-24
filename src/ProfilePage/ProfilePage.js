import React from "react";
import {connect} from "react-redux";
import moment from "moment";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRange from '@material-ui/icons/DateRange';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import EventAvailable from '@material-ui/icons/EventAvailable';
import Button from '@material-ui/core/Button';

import Header from "../_components/general/Header";
import mapActions from "../_actions/map.actions";

import history from "../_helpers/history";
import TripCard from "../_components/map/TripCard";
import OptedTripCard from "../_components/map/OptedTripCard";

import {
    getOptedUserTrips,
    getScheduledUserTrips,
    getCompletedUserTrips,
    getCancelledUserTrips,
    getUserRides,
} from "../_reducers";

const styles = {
    media: {
        objectFit: 'cover',
    },
    root: {
        maxWidth: 1700,
        margin: "0 auto",
        padding: "24px"
    },
    button: {
        color: "#fff",
        background: "#DF691A",
        margin: "0 48px",
        "&:hover": {
            background: "#DF691A",
            opacity: 0.9
        },
        minWidth: 144
    },
    link: {
        textDecoration: "none",
        color: "#000",
        "&:hover": {}
    }
};


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        const {location} = props;

        this.state = {
            selectedType: location.state && location.state.selectedType ? location.state.selectedType : "Opted"
        };
    }

    handleListItemClick = (event, index) => {
        this.setState({selectedType: index});
    };


    componentDidMount() {
        this.props.getUserTrips();
        this.props.getUserRides();
    }

    render() {
        console.log("LOCATION STATE", this.props.location.state);
        const {classes, optedTrips, cancelledTrips, completedTrips, scheduledTrips, user, userRides} = this.props;
        const {selectedType} = this.state;

        const currentTrips = {
            "Cancelled": cancelledTrips,
            "Opted": optedTrips,
            "Completed": completedTrips,
            "Scheduled": scheduledTrips
        }[selectedType];

        return (
            <div>
                <Header/>
                <Grid container className={classes.root} spacing={24} justify="center">
                    <Grid item xs={12} container>
                        <Grid item xs>
                            <Typography variant="headline" gutterBottom>
                                Your trips
                            </Typography>
                        </Grid>
                        <Grid item xs style={{textAlign: "right"}}>
                            <Button onClick={() => history.push("/trips/add")} variant="contained"
                                    className={classes.button}>
                                Add Trip
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={24}>
                        <Grid item xs={2}>
                            <List component="nav">
                                <ListItem
                                    button
                                    selected={selectedType === "Opted"}
                                    onClick={event => this.handleListItemClick(event, "Opted")}
                                >
                                    <ListItemIcon>
                                        <EventAvailable/>
                                    </ListItemIcon>
                                    <ListItemText primary="Opted"/>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedType === "Scheduled"}
                                    onClick={event => this.handleListItemClick(event, "Scheduled")}
                                >
                                    <ListItemIcon>
                                        <DateRange/>
                                    </ListItemIcon>
                                    <ListItemText primary="Scheduled"/>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedType === "Completed"}
                                    onClick={event => this.handleListItemClick(event, "Completed")}
                                >
                                    <ListItemIcon>
                                        <Done/>
                                    </ListItemIcon>
                                    <ListItemText primary="Completed"/>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedType === "Cancelled"}
                                    onClick={event => this.handleListItemClick(event, "Cancelled")}
                                >
                                    <ListItemIcon>
                                        <Close/>
                                    </ListItemIcon>
                                    <ListItemText primary="Cancelled"/>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={10} container>
                            <Grid item xs={12} container spacing={24}>
                                {
                                    !currentTrips || currentTrips.length === 0 ?
                                        <Typography variant="headline" style={{color: "#999", margin: "48px auto"}}>
                                            No trips to display
                                        </Typography> : currentTrips.map((trip, index) => {
                                            const route = JSON.parse(trip.route);
                                            const date = moment.unix(trip.departure).format("DD/MM/YYYY");
                                            const time = moment.unix(trip.departure).format("HH:mm a");

                                            let optedTrip = null;
                                            let optedTripCard = null;

                                            if (user.role === "Driver") {
                                                const filteredTrips = userRides.filter(ride => ride.driver_trip.id === trip.id);
                                                if (filteredTrips.length) {
                                                    optedTrip = filteredTrips[0].hitchhiker_trip;

                                                    optedTripCard = (
                                                        <OptedTripCard
                                                            driverTrip={trip}
                                                            hitchhikerTrip={optedTrip}
                                                        />
                                                    );
                                                }
                                            } else if (user.role === "Hitchhiker") {
                                                const filteredTrips = userRides.filter(ride => ride.hitchhiker_trip.id === trip.id);
                                                if (filteredTrips.length) {
                                                    optedTrip = filteredTrips[0].driver_trip;

                                                    optedTripCard = (
                                                        <OptedTripCard
                                                            driverTrip={optedTrip}
                                                            hitchhikerTrip={trip}
                                                        />
                                                    );
                                                }
                                            }


                                            return trip.status === "Opted" ? (
                                                <Grid item container xs={12} key={index}>
                                                    <Grid item xs={2}/>
                                                    <Grid item xs={8}>
                                                        {optedTripCard}
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                <Grid item xs={12} lg={4} key={index}>
                                                    {user.role === 'Driver' && trip.status === "Scheduled" ? (
                                                        <TripCard
                                                            route={route}
                                                            date={date}
                                                            time={time}
                                                            trip={trip}
                                                            redirectTo={`/trips/${trip.id}`}
                                                        />
                                                    ) : (
                                                        <TripCard
                                                            route={route}
                                                            date={date}
                                                            time={time}
                                                            trip={trip}
                                                        />
                                                    )}
                                                </Grid>
                                            )
                                        })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    optedTrips: getOptedUserTrips(state),
    scheduledTrips: getScheduledUserTrips(state),
    completedTrips: getCompletedUserTrips(state),
    cancelledTrips: getCancelledUserTrips(state),
    userRides: getUserRides(state)
});

export default connect(mapStateToProps, {
    getUserTrips: mapActions.getUserTrips,
    getUserRides: mapActions.getUserRides
})(withStyles(styles)(ProfilePage));
