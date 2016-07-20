import React, {Component} from 'react';
import {Router, Route, Schema} from 'react-native-redux-router';
import {connect} from 'react-redux';

import Search from './containers/SearchContainer';

class App extends Component {
    render() {
        return (
            <Router>
                <Route name="search" component={Search} initial={true} />
            </Router>
        )
    }
}

export default connect()(App);