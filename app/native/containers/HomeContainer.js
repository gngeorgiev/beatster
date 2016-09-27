import React, {Component} from 'react';
import {View, Text, ListView, TouchableOpacity, Image, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {Toolbar} from 'react-native-material-design';
import {Actions} from 'react-native-redux-router';
import {readFile} from 'react-native-fs';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from '../components/TabBar';
import {play} from '../../actions/play';
import {renderListSeparator} from '../components/helpers/ListViewHelper';
import AudioPlayer from '../modules/AudioPlayer';

class HomeComponent extends Component {
    constructor() {
        super();

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            downloadsData: this.dataSource.cloneWithRows([])
        };
    }

    componentDidMount() {
        this._downloadedListener = DeviceEventEmitter.addListener('OnDownloaded', () => this.refreshDownloadedTracks());
    }

    componentWillUnmount() {
        this._downloadedListener.remove();
        this._downloadedListener = null;
    }

    refreshDownloadedTracks() {
        AudioPlayer.getDownloadsFolder()
            .then(path => readFile(path + '/data.json'))
            .then(data => JSON.parse(data))
            .then(tracks => this.setState({downloadsData: this.dataSource.cloneWithRows(tracks)}))
            .catch(err => console.log(err));
    }

    renderDownloadsListView() {
        const renderListRow = track => {
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
        };

        this.refreshDownloadedTracks();

        return (
            <ListView
                key={'download'}
                tabLabel={'download'}
                contentContainerStyle={{padding: 5}}
                renderSeparator={(sectionId, rowId) => renderListSeparator(sectionId, rowId)}
                renderRow={item => renderListRow(item)}
                enableEmptySections={true}
                dataSource={this.state.downloadsData}
            />
        )
    }

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

                <ScrollableTabView
                    style={{marginTop: 55}}
                    initialPage={0}
                    renderTabBar={() => <TabBar />}
                >

                    {this.renderDownloadsListView()}

                </ScrollableTabView>
            </View>
        )
    }
}

export default connect()(HomeComponent);