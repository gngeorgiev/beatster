import React, {Component, PropTypes} from 'react';
import {IconToggle, Ripple} from 'react-native-material-design';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'native-base';

export default class IconButton extends Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        iconSize: PropTypes.number,
        rippleColor: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        iconSize: 50,
        rippleColor: 'rgba(0,0,0,.2)'
    };

    render() {
        const {
            iconName,
            iconSize,
            rippleColor,
            onPress
        } = this.props;

        return (
            <Ripple color={rippleColor}>
                <Button transparent onPress={onPress}>
                    <Icon name={iconName} size={iconSize} />
                </Button>
            </Ripple>
        )
    }
}