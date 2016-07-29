import React, {Component, PropTypes} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import RippleButton from './RippleButton';

export default class IconButton extends Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        iconSize: PropTypes.number,
        iconStyle: PropTypes.object,
        onPress: PropTypes.func
    };

    static defaultProps = {
        iconSize: 50
    };

    render() {
        const {
            iconName,
            iconSize,
            onPress,
            iconStyle
        } = this.props;

        return (
            <RippleButton onPress={onPress}>
                <Icon name={iconName} size={iconSize} style={iconStyle} />
            </RippleButton>
        )
    }
}