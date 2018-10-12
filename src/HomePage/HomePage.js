import React from "react";

import {withStyles} from '@material-ui/core/styles';

import Autocomplete from 'react-google-autocomplete';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CardMedia from '@material-ui/core/CardMedia';


const styles = {
    inputLabel: {
        fontSize: 18,
    },
    input: {
        borderRadius: 4,
        backgroundColor: "#fff",
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '8px 12px',
        maxWidth: 500,
        margin: "24px 0 12px",
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
        ].join(',')
    },
    mapCard: {
        maxWidth: 1500,
        margin: "24px auto"
    },
    contentColumns: {
        display: "flex"
    },
    leftColumn: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    rightColumn: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    routeCard: {
        margin: "12px 0",
        maxWidth: 800,
        width: "100%",
        display: 'flex',
    },
    routeMap: {
        width: "100%",

    },
    routeCardDetails: {
        minWidth: 300
    }
};

class MapComponent extends React.Component {
    render() {
        const {from, to, directions, directionsIndex} = this.props;

        let directionsArray = [];
        if (directions && directionsIndex) {
            console.log(directions,);
            directionsArray.push(<DirectionsRenderer directions={directions} routeIndex={directionsIndex}/>);
        }
        else if (directions)
            for (var i = 0; i < directions.routes.length; i++)
                directionsArray.push(<DirectionsRenderer key={i} directions={directions} routeIndex={i}/>);


        console.log(directions);

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: 49.83826, lng: 24.02324}}
            >
                {from && <Marker position={{lat: from.geometry.location.lat(), lng: from.geometry.location.lng()}}/>}
                {to && <Marker position={{lat: to.geometry.location.lat(), lng: to.geometry.location.lng()}}/>}
                {directionsArray}
            </GoogleMap>
        )
    }
}

MapComponent = withScriptjs(withGoogleMap(MapComponent));

class HomePage extends React.Component {
    state = {
        from: null,
        to: null,
        directions: null
    };

    handleInput = position => place => {
        this.setState({
            [position]: place
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {from, to,} = this.state;

        const DirectionsService = new window.google.maps.DirectionsService();

        if (from && to && (from !== prevState.from || to !== prevState.to)) {
            DirectionsService.route({
                origin: new window.google.maps.LatLng(from.geometry.location.lat(), from.geometry.location.lng()),
                destination: new window.google.maps.LatLng(to.geometry.location.lat(), to.geometry.location.lng()),
                travelMode: window.google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK)
                    this.setState({directions: result});
                else
                    this.setState({directions: null});
            });
            this.setState({directions: null});
        }
    }

    render() {
        const {classes} = this.props;
        const {from, to, directions} = this.state;

        const routes = ['First route', 'Second route'];

        return (
            <div className={classes.root}>
                <Card className={classes.mapCard}>
                    <MapComponent
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7ZXOS5Bpp8MHRH98KJ6NPP9W-x0S3Zrk&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `500px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        from={from}
                        to={to}
                        directions={directions}
                    />
                    <CardContent className={classes.contentColumns}>
                        <div className={classes.leftColumn}>
                            <FormControl className={classes.margin}>
                                <InputLabel shrink htmlFor="from-point" className={classes.inputLabel}>
                                    From
                                </InputLabel>
                                <Autocomplete
                                    id="from-point"
                                    placeholder=""
                                    className={classes.input}
                                    onPlaceSelected={this.handleInput("from")}
                                    types={['address']}
                                    componentRestrictions={{country: "ua"}}
                                />
                            </FormControl>

                            <FormControl className={classes.margin}>
                                <InputLabel shrink htmlFor="to-point" className={classes.inputLabel}>
                                    To
                                </InputLabel>
                                <Autocomplete
                                    id="to-point"
                                    placeholder=""
                                    className={classes.input}
                                    onPlaceSelected={this.handleInput("to")}
                                    types={['address']}
                                    componentRestrictions={{country: "ua"}}
                                />
                            </FormControl>

                        </div>
                        <div className={classes.rightColumn}>
                            {
                                directions && directions.routes.map((route, index) => (
                                    <Card className={classes.routeCard}>
                                        <div className={classes.routeCardDetails}>
                                            <CardContent>
                                                {route.summary}
                                            </CardContent>
                                        </div>
                                        <div className={classes.routeMap}>
                                            <MapComponent
                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7ZXOS5Bpp8MHRH98KJ6NPP9W-x0S3Zrk&v=3.exp&libraries=geometry,drawing,places"
                                                loadingElement={<div style={{height: `100%`}}/>}
                                                containerElement={<div style={{height: `300px`}}/>}
                                                mapElement={<div style={{height: `100%`}}/>}
                                                from={from}
                                                to={to}
                                                directions={directions}
                                                directionsIndex={index}
                                            />
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);
