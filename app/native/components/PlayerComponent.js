import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconButton from './IconButton';

export default class PlayerComponent extends Component {
    render() {
        return <View style={{flex: 1, flexDirection: 'row'}}>
            <IconButton iconName="skip-previous"/>
            <IconButton iconName="play-arrow"/>
            <IconButton iconName="skip-next"/>
        </View>
    }
}