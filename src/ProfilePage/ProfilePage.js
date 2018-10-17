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

import {
    StaticGoogleMap,
    Marker,
    Path,
} from 'react-static-google-map';

import Header from "../_components/general/Header";
import mapActions from "../_actions/map.actions";
import MarkerA from "../static/img/marker-a.svg";
import MarkerB from "../static/img/marker-b.svg";

const styles = {
    card: {
        maxWidth: 345,
        margin: "0 auto"
    },
    media: {
        objectFit: 'cover',
    },
    root: {
        maxWidth: 1600,
        margin: "0 auto",
        padding: "24px"
    },
};

const StaticMap = props => {
    const {route} = props;
    return (
        <StaticGoogleMap size="345x345" apiKey="AIzaSyC7ZXOS5Bpp8MHRH98KJ6NPP9W-x0S3Zrk">
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

class ProfilePage extends React.Component {
    componentDidMount() {
        this.props.getUserTrips();
    }

    render() {
        const {classes, user} = this.props;

        return (
            <div>
                <Header/>
                <Grid container className={classes.root}>
                    <Grid item xs={12} container>
                        <Grid item xs={12}>
                            <Typography variant="headline" gutterBottom>
                                Your trips
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container>
                            {user.trips && user.trips.map((trip, index) => {
                                    const route = JSON.parse(trip.route);
                                    const date = moment.unix(trip.departure).format("DD/MM/YYYY");
                                    const time = moment.unix(trip.departure).format("HH:mm a");
                                    console.log(trip.departure);

                                    return (
                                        <Grid item xs={4} key={index}>
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
                                        </Grid>
                                    )
                                }
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {getUserTrips: mapActions.getUserTrips})(withStyles(styles)(ProfilePage));
