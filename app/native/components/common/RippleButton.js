import React, {Component, PropTypes} from 'react';
import {Ripple} from 'react-native-material-design';
import {Button} from 'native-base';

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
            <Button transparent style={Object.assign(style, {padding: 0})} onPress={onPress}>
                {children}
            </Button>
        )
    }
}