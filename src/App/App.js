import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

import GuestRoute from '../_components/routes/GuestRoute';
import PrivateRoute from '../_components/routes/PrivateRoute';

import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";
import TripDetailsPage from "../TripDetailsPage/TripDetailsPage";

import ProfilePage from "../ProfilePage/ProfilePage";
import userActions from "../_actions/user.actions";

import {isAuthenticated} from "../_reducers";


class App extends React.Component {
    componentDidMount() {
        const {isAuthenticated, getCurrentUser} = this.props;
        if(isAuthenticated)
            getCurrentUser();
    }

    render() {
        const {location} = this.props;

        return (
            <div className="container">
                <PrivateRoute location={location} exact path="/trips/add" component={HomePage}/>
                <PrivateRoute location={location} exact path="/trips/:id" component={TripDetailsPage}/>
                <PrivateRoute location={location} exact path="/" component={ProfilePage}/>
                <GuestRoute location={location} exact path="/auth" component={AuthPage}/>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: isAuthenticated(state)
});

export default connect(mapStateToProps, {getCurrentUser: userActions.getCurrent})(App);
