import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Header, InputGroup, Input, Icon, Button, List, ListItem} from 'native-base';
import {search} from '../../actions/search';
import {play} from '../../actions/play';

class SearchComponent extends Component {
    renderListRow(track) {
        return (
            <ListItem onPress={() => this.props.dispatch(play(track))}>
                <Text>{track.title}</Text>
            </ListItem>
        )
    }

    render() {
        const {dispatch, searchResults} = this.props;
        const data = searchResults.YouTube; //TODO: add other providers

        return (
            <Container>
                <Content>
                    <Header searchBar>
                        <InputGroup>
                            <Icon name="md-search" />
                            <Input ref="searchInput" placeholder="Search for a track" onSubmitEditing={ev => dispatch(search(ev.nativeEvent.text))} />
                            <Icon name="md-musical-note" />
                        </InputGroup>
                        <Button transparent>
                            Search
                        </Button>
                    </Header>

                    <List dataArray={data} renderRow={item => this.renderListRow(item)}>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default connect(state => ({
    searchResults: state.search
}))(SearchComponent);