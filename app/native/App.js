import React, {Component} from 'react';
import {View} from 'react-native';
import {Router, Route} from 'react-native-redux-router';
import {connect} from 'react-redux';

import Player from './containers/PlayerContainer';
import Search from './containers/SearchContainer';

import Loading from './components/LoadingComponent';

class App extends Component {
    render() {
        const {loading} = this.props;

        return (
            <View style={{flex: 1}}>
                <Loading visible={loading} />
                <View style={{position: 'absolute', left: 0, right: 0, top:0, bottom: 0, backgroundColor: '#fff'}} />

                <View style={{flex: 1}}>
                    <Router>
                        <Route name="search" component={Search} initial={true} />
                    </Router>

                    <View style={{height: 50}}>
                        <Player/>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(state => ({
    loading: state.loading
}))(App);