import React from "react";

import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Today from "@material-ui/icons/Today";
import AccessTime from '@material-ui/icons/AccessTime';

import MarkerA from "../../static/img/marker-a.svg";
import MarkerB from "../../static/img/marker-b.svg";
import {Marker, Path, StaticGoogleMap} from "react-static-google-map";

const styles = {
    card: {
        maxWidth: 450,
        margin: "0 auto"
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

export default withStyles(styles)(TripCard);
