import React, {Component} from 'react';
import {View, Text, ListView, Image, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Header, InputGroup, Input, Icon, Button} from 'native-base';
import {search} from '../../actions/search';
import {play} from '../../actions/play';

class SearchComponent extends Component {
    constructor() {
        super();

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    renderListRow(track) {
        return (
            <TouchableOpacity onPress={() => this.props.dispatch(play(track))}>
                <View>
                    <Image style={{width: 64, height: 64}} source={{uri: track.thumbnail}} />
                    <Text >{track.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderListHeader() {
        return (
            <Header searchBar>
                <InputGroup>
                    <Icon name="md-search" />
                    <Input ref="searchInput" placeholder="Search for a track" onSubmitEditing={ev => this.props.dispatch(search(ev.nativeEvent.text))} />
                    <Icon name="md-musical-note" />
                </InputGroup>
                <Button transparent>
                    Search
                </Button>
            </Header>
        );
    }

    render() {
        const {searchResults} = this.props;
        const data = searchResults.YouTube; //TODO: add other providers
        const ds = this.dataSource.cloneWithRows(data);

        return (
            <ListView
                renderHeader={() => this.renderListHeader()}
                enableEmptySections={true}
                dataSource={ds}
                renderRow={item => this.renderListRow(item)}
            />
        )
    }
}

export default connect(state => ({
    searchResults: state.search
}))(SearchComponent);