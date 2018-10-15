import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router";

import GuestRoute from '../_components/routes/GuestRoute';
import PrivateRoute from '../_components/routes/PrivateRoute';

import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";

const App = ({ location }) => (
    <div className="container">
        <PrivateRoute location={location} exact path="/" component={HomePage} />
        <GuestRoute location={location} exact path="/auth" component={AuthPage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
