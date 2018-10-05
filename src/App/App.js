import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router";

import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";

const App = ({ location }) => (
    <div className="container">
        <Route location={location} exact path="/" component={HomePage} />
        <Route location={location} exact path="/auth" component={AuthPage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
