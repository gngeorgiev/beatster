import React, {Component} from 'react';
import {View, Text, ListView, Image, TouchableNativeFeedback, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {search} from '../../actions/search';
import {play} from '../../actions/play';
import {Actions} from 'react-native-redux-router';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {MKTextField} from 'react-native-material-kit';

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

            <View
                style={{flex: 1, flexDirection: 'row', height: 56}}
                elevation={5}
            >
                <Grid>
                    <Col size={15}>
                        <IconButton iconName="arrow-back" iconSize={25} onPress={Actions.pop} />
                    </Col>
                    <Col size={80}>
                        <MKTextField
                            placeholder="Search tracks"
                            style={{height: 50}}
                            onSubmitEditing={ev => this.props.dispatch(search(ev.nativeEvent.text))}
                        />
                    </Col>
                    <Col size={5} />
                </Grid>
            </View>
        );
    }

    render() {
        const {searchResults} = this.props;
        const data = searchResults.YouTube; //TODO: add other providers
        const ds = this.dataSource.cloneWithRows(data);

        return (
            <ListView
                style={{flex: 1, padding: 0}}
                contentContainerStyle={{padding: 0}}
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