import React, {Component, PropTypes} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import RippleButton from './RippleButton';

export default class IconButton extends Component {
    static IconTypes = {
        'Material': 'MaterialIcon',
        'FontAwesome': 'FontAwesomeIcon'
    };

    static icons = { FontAwesomeIcon, MaterialIcon };

    static getIcon(type) {
        return IconButton.icons[type] || MaterialIcon;
    }

    static propTypes = {
        iconName: PropTypes.string.isRequired,
        iconSize: PropTypes.number,
        iconStyle: PropTypes.object,
        type: PropTypes.string,
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
            iconStyle,
            type
        } = this.props;

        const Icon = IconButton.getIcon(type);

        return (
            <RippleButton onPress={onPress}>
                <Icon name={iconName} size={iconSize} style={iconStyle} />
            </RippleButton>
        )
    }
}