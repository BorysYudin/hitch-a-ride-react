import React from "react";

import {withStyles} from '@material-ui/core/styles';

import Autocomplete from 'react-google-autocomplete';


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

const HomePage = ({ classes }) => (
    <div>
        <Autocomplete
            placeholder="From"
            className={classes.input}
            onPlaceSelected={(place) => {
                console.log(place);
            }}
            types={['address']}
            componentRestrictions={{country: "ua"}}
        />
        <Autocomplete
            placeholder="To"
            className={classes.input}
            onPlaceSelected={(place) => {
                console.log(place);
            }}
            types={['address']}
            componentRestrictions={{country: "ua"}}
        />
    </div>
);

export default withStyles(styles)(HomePage);
