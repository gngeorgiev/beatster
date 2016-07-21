import React, {Component} from 'react';
import {View} from 'react-native';
import {Router, Route, Schema} from 'react-native-redux-router';
import {connect} from 'react-redux';

import Player from './components/PlayerComponent';

import Search from './containers/SearchContainer';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{position: 'absolute', left: 0, right: 0, top:0, bottom: 0, backgroundColor: '#fff'}} />

                <Router>
                    <Route name="search" component={Search} initial={true} />
                </Router>

                <View style={{height: 50}}>
                    <Player/>
                </View>
            </View>
        )
    }
}

export default connect()(App);