import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import {Provider} from 'react-redux';

import App from './app/native/App';

import store from './app/store/store';

class Beatstr extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('beatstr', () => Beatstr);
