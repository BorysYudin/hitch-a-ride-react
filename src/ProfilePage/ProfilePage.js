import React from "react";
import {connect} from "react-redux";
import moment from "moment";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from "@material-ui/core/Typography/Typography";
import Today from '@material-ui/icons/Today';
import AccessTime from '@material-ui/icons/AccessTime';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRange from '@material-ui/icons/DateRange';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import EventAvailable from '@material-ui/icons/EventAvailable';
import Button from '@material-ui/core/Button';

import {
    StaticGoogleMap,
    Marker,
    Path,
} from 'react-static-google-map';

import Header from "../_components/general/Header";
import mapActions from "../_actions/map.actions";
import MarkerA from "../static/img/marker-a.svg";
import MarkerB from "../static/img/marker-b.svg";
import history from "../_helpers/history";

const styles = {
    card: {
        maxWidth: 450,
        margin: "0 auto"
    },
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
};

const StaticMap = props => {
    const {route} = props;
    return (
        <StaticGoogleMap size="450x345" apiKey="AIzaSyC7ZXOS5Bpp8MHRH98KJ6NPP9W-x0S3Zrk">
            <Marker
                location={{
                    lat: route.request.origin.location.lat,
                    lng: route.request.origin.location.lng
                }}
                label="A"
            />
            <Marker
                location={{
                    lat: route.request.destination.location.lat,
                    lng: route.request.destination.location.lng
                }}
                label="B"
            />
            <Path
                color="0xff0000ff"
                weight="5"
                points={route.routes[0].overview_path}
            />
        </StaticGoogleMap>
    );
};

const TripCard = ({route, date, time, classes}) => (
    <Card className={classes.card}>
        <CardActionArea>
            <StaticMap route={route}/>
            <CardContent>
                <Grid container spacing={24}>
                    <Grid item container spacing={40}>
                        <Grid item xs={1}>
                            <img src={MarkerA} alt="Marker A"/>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                {route.routes[0].legs[0].start_address}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={40}>
                        <Grid item xs={1}>
                            <img src={MarkerB} alt="Marker A"/>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                {route.routes[0].legs[0].end_address}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={40}>
                        <Grid item xs={1}>
                            <Today/>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                {date}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={40}>
                        <Grid item xs={1}>
                            <AccessTime/>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                {time}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
    </Card>
);

class ProfilePage extends React.Component {
    state = {
        selectedType: "Opted"
    };

    handleListItemClick = (event, index) => {
        this.setState({selectedType: index});
    };


    componentDidMount() {
        this.props.getUserTrips();
    }

    render() {
        const {classes, trips} = this.props;
        const {selectedType} = this.state;

        const currentTrips = {
            "Cancelled": trips.cancelled,
            "Opted": trips.opted,
            "Completed": trips.completed,
            "Scheduled": trips.scheduled
        }[selectedType];

        return (
            <div>
                <Header/>
                <Grid container className={classes.root} spacing={24}>
                    <Grid item xs={12} container>
                        <Grid item xs>
                            <Typography variant="headline" gutterBottom>
                                Your trips
                            </Typography>
                        </Grid>
                        <Grid item xs style={{textAlign: "right"}}>
                            <Button onClick={() => history.push("/trips/add")} variant="contained" className={classes.button}>
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

                                            return (
                                                <Grid item xs={12} lg={4} key={index}>
                                                    <TripCard route={route} date={date} time={time} classes={classes}/>
                                                </Grid>
                                            )
                                        })}
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
    trips: state.trips
});

export default connect(mapStateToProps, {getUserTrips: mapActions.getUserTrips})(withStyles(styles)(ProfilePage));
