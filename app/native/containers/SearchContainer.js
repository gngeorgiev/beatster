import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class SearchComponent extends Component {
    render() {
        return (
            <View>
                <Text>
                    SEARCH
                </Text>
            </View>
        )
    }
}

export default connect()(SearchComponent);