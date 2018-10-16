import PropTypes from "prop-types";
import React from "react";

import GuestRoute from '../_components/routes/GuestRoute';
import PrivateRoute from '../_components/routes/PrivateRoute';

import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";
import ProfilePage from "../ProfilePage/ProfilePage";

const App = ({ location }) => (
    <div className="container">
        <PrivateRoute location={location} exact path="/trips/add" component={HomePage} />
        <PrivateRoute location={location} exact path="/" component={ProfilePage} />
        <GuestRoute location={location} exact path="/auth" component={AuthPage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
