import React from "react";

import {withStyles} from '@material-ui/core/styles';

import Autocomplete from 'react-google-autocomplete';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";


const styles = {
    input: {
        borderRadius: 4,
        backgroundColor: "#fff",
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '8px 12px',
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
    }
};

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directions: null
        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {from, to, } = this.props;

        const DirectionsService = new window.google.maps.DirectionsService();

        if (from && to && (from !== prevProps.from || to !== prevProps.to)) {
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
        const {from, to} = this.props;
        const {directions} = this.state;

        let directionsArray = null;
        if (directions) {
            directionsArray = [];
            for (var i = 0; i < directions.routes.length; i++)
                directionsArray.push(<DirectionsRenderer key={i} directions={directions} routeIndex={i}/>);
        }

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
        to: null
    };

    handleInput = position => place => {
        this.setState({
            [position]: place
        });
    };

    render() {
        const {classes} = this.props;
        const {from, to} = this.state;

        return (
            <div>
                <Autocomplete
                    placeholder="From"
                    className={classes.input}
                    onPlaceSelected={this.handleInput("from")}
                    types={['address']}
                    componentRestrictions={{country: "ua"}}
                />
                <Autocomplete
                    placeholder="To"
                    className={classes.input}
                    onPlaceSelected={this.handleInput("to")}
                    types={['address']}
                    componentRestrictions={{country: "ua"}}
                />
                <MapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7ZXOS5Bpp8MHRH98KJ6NPP9W-x0S3Zrk&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                    from={from}
                    to={to}
                />
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);
