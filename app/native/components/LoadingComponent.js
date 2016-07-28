import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

export default class LoadingComponent extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired
    };

    render() {
        const {visible} = this.props;

        if (!visible) {
            return <View/>;
        }

        return <View style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.3,
            backgroundColor: 'black'
        }}>
            <Spinner size={50} type={'Wave'}/>
        </View>;
    }
}