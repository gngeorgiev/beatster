import React, {Component} from 'react';
import {View} from 'react-native';
import {Router, Route} from 'react-native-redux-router';
import {Provider} from 'react-redux';

import store from './src/store/store';

import Search from './src/beatstr-core/search/SearchContainer';


class App extends Component {
    render() {
        return (
            <View>
                <Router>
                    <Route name="search" component={() => <Search />} initial={true} title="Search" />
                </Router>
            </View>
        )
    }
}

class Beatstr extends Component {
    render() {
        return (
            <Provider store={store}>
                {() => <App />}
            </Provider>
        )
    }
}

AppRegistry.registerComponent('Beatstr', () => Beatstr);
