import React, {Component, PropTypes} from 'react';
import {TouchableNativeFeedback, View} from 'react-native';

export default class RippleButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.object,
        children: PropTypes.node
    };

    static defaultProps = {
        iconSize: 50,
        style: {}
    };

    render() {
        const {
            onPress,
            style,
            children
        } = this.props;

        return (
            <TouchableNativeFeedback
                style={style}
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple('#000000')}
                delayPressIn={0}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        )
    }
}