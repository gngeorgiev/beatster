import React, {Component} from 'react';
import {View, Text, Navigator} from 'react-native';
import {Router, Route, Schema} from 'react-native-redux-router';
import {connect} from 'react-redux';

import Player from './containers/PlayerContainer';
import Home from './containers/HomeContainer';
import Search from './containers/SearchContainer';

import Loading from './components/LoadingComponent';

class Footer extends Component {
    render() {
        return (
            <View style={{height: 50, maxHeight: 50}}>
                <Player/>
            </View>
        )
    }
}

class App extends Component {
    render() {
        const {loading} = this.props;

        return (
            <View style={{flex: 1}}>
                <Loading visible={loading} />
                <View style={{position: 'absolute', left: 0, right: 0, top:0, bottom: 0, backgroundColor: '#fff'}} />

                <View style={{flex: 1}}>
                    <Router>
                        <Schema
                            name="default"
                            sceneConfig={Navigator.SceneConfigs.FadeAndroid}
                            hideNavBar={true}
                            hideFooter={true}
                        />

                        <Route name="homeView" component={Home} initial={true} />
                        <Route name="searchView" component={Search} />
                    </Router>

                    <Footer />
                </View>
            </View>
        )
    }
}

export default connect(state => ({
    loading: state.loading
}))(App);