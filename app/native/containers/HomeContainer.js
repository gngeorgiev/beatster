import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Toolbar} from 'react-native-material-design';
import {Actions} from 'react-native-redux-router';

class HomeComponent extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    style={{flex: 1}}
                    title="Beatster"
                    actions={[{
                        icon: 'search',
                        onPress: Actions.searchView
                    }]}
                />

                <View style={{flex: 1}}>
                    <Text>Home</Text>
                </View>
            </View>
        )
    }
}

export default connect()(HomeComponent);