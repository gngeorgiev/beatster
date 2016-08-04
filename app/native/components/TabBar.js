const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated
} = ReactNative;
import IconButton from './common/IconButton';

const DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        underlineColor: React.PropTypes.string,
        underlineHeight: React.PropTypes.number,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            underlineColor: 'navy',
            backgroundColor: null,
            underlineHeight: 4,
        };
    },

    renderTabOption(name, page) {
        const isTabActive = this.props.activeTab === page;
        const { activeTextColor, inactiveTextColor } = this.props;

        return <IconButton
            style={{flex: 1}}
            key={name}
            type={IconButton.IconTypes.FontAwesome}
            accessible={true}
            onPress={() => this.props.goToPage(page)}
            iconName={name}
            iconSize={30}
            iconStyle={{color: isTabActive ? activeTextColor : inactiveTextColor }}
        />
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
        });

        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                <Animated.View style={{ left }} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#ccc',
    },
});

module.exports = DefaultTabBar;
