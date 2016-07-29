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
            <TouchableOpacity
                onPress={() => this.props.dispatch(play(track))}
                style={{padding: 5}}
            >
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={{width: 64, height: 64, marginRight: 10}} source={{uri: track.thumbnail}} />
                    <Text style={{alignItems: 'center', textAlignVertical: 'center', fontSize: 16}}>{track.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderListSeparator(sectionId, rowId) {
        return (
            <View
                key={`${sectionId}-${rowId}`}
                style={{
                    borderTopColor: 'black',
                    borderTopWidth: 1,
                    marginTop: 4,
                    marginBottom: 4,
                    marginRight: 10,
                    marginLeft: 10,
                    opacity: 0.2
                }}
            />
        )
    }

    renderListHeader() {
        return (
            <Header searchBar>
                <InputGroup>
                    <Icon name="md-search" />
                    <Input ref="searchInput" placeholder="Search for a track" onSubmitEditing={ev => this.props.dispatch(search(ev.nativeEvent.text))} />
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
                renderSeparator={(sectionId, rowId) => this.renderListSeparator(sectionId, rowId)}
                renderHeader={() => this.renderListHeader()}
                renderRow={item => this.renderListRow(item)}
                enableEmptySections={true}
                dataSource={ds}
            />
        )
    }
}

export default connect(state => ({
    searchResults: state.search
}))(SearchComponent);