import React, {Component} from 'react';
import {View, Text, ListView, Image, TouchableNativeFeedback, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {map, debounce} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {search} from '../../actions/search';
import {play} from '../../actions/play';
import {autocomplete} from '../../actions/autocomplete';
import {Actions} from 'react-native-redux-router';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {MKTextField} from 'react-native-material-kit';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/TabBar';
import getProviderIcon from '../../utils/getProviderIcon';

class SearchComponent extends Component {
    state = {};

    constructor() {
        super();

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentWillUnmount() {
        this.props.dispatch(search(''));
        this.props.dispatch(autocomplete(''));
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

    search(text) {
        this.props.dispatch(search(text));
        this.refs.textField.blur();
        this.setState({showAutocomplete: false});
    }

    renderHeader() {
        return (
            <View
                style={{flexDirection: 'row', height: 56}}
                elevation={5}
            >
                <Grid>
                    <Col size={15}>
                        <IconButton iconName="arrow-back" iconSize={25} onPress={() => Actions.pop()} />
                    </Col>
                    <Col size={75}>
                        <MKTextField
                            ref="textField"
                            placeholder="Search tracks"
                            style={{height: 50}}
                            value={this.state.textValue}
                            onChange={ev => this.setState({textValue: ev.nativeEvent.text})}
                            onChangeText={debounce(text => this.props.dispatch(autocomplete(text)), 200)}
                            onSubmitEditing={ev => this.search(ev.nativeEvent.text)}
                            onFocus={() => this.setState({showAutocomplete: true})}
                        />
                    </Col>
                    <Col size={10}>
                        <IconButton iconName="close" iconSize={25} onPress={() => {
                            this.setState({textValue: ''});
                            this.props.dispatch(autocomplete(''))
                        }}/>
                    </Col>
                </Grid>
            </View>
        );
    }

    renderSearchResultsListView(providers) {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <TabBar />}
            >

                {map(providers, provider => {
                    return <ListView
                        key={provider.name}
                        tabLabel={provider.icon}
                        contentContainerStyle={{padding: 5}}
                        renderSeparator={(sectionId, rowId) => this.renderListSeparator(sectionId, rowId)}
                        renderRow={item => this.renderListRow(item)}
                        enableEmptySections={true}
                        dataSource={provider.data}
                    />
                })}

            </ScrollableTabView>
        );
    }

    renderAutocompleteListRow(item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.search(item);
                    this.setState({textValue: item})
                }}
                style={{padding: 15}}
            >
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name="search" size={24} style={{marginRight: 10}} />
                    <Text style={{alignItems: 'center', textAlignVertical: 'center', fontSize: 16}}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderAutocompleteListView(data) {
        const ds = this.dataSource.cloneWithRows(data);

        return (
            <ListView
                contentContainerStyle={{padding: 5}}
                renderRow={item => this.renderAutocompleteListRow(item)}
                enableEmptySections={true}
                dataSource={ds}
            />
        );
    }

    renderListView(providers, autoCompleteResults) {
        if ((autoCompleteResults.length || this.state.textValue === '')&& this.state.showAutocomplete) {
            return this.renderAutocompleteListView(autoCompleteResults);
        } else if (providers.length) {
            return this.renderSearchResultsListView(providers);
        }

        return <View />
    }

    render() {
        const {searchResults, autoCompleteResults} = this.props;

        const providers = map(searchResults, (_, provider) => {
            return {
                name: provider,
                icon: getProviderIcon(provider),
                data: this.dataSource.cloneWithRows(searchResults[provider])
            }
        });

        return (
            <View style={{flex: 1}} accessible={true}>
                {this.renderHeader()}
                {this.renderListView(providers, autoCompleteResults)}
            </View>
        )
    }
}

export default connect(state => ({
    searchResults: state.search,
    autoCompleteResults: state.autocomplete
}))(SearchComponent);