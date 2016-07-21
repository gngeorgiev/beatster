import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Header, InputGroup, Input, Icon, Button, List, ListItem} from 'native-base';

class SearchComponent extends Component {
    renderListRow(item) {
        return (
            <ListItem>
                <Text>{item}</Text>
            </ListItem>
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header searchBar>
                        <InputGroup>
                            <Icon name="md-search" />
                            <Input placeholder="Search for a track" />
                            <Icon name="md-musical-note" />
                        </InputGroup>
                        <Button transparent>
                            Search
                        </Button>
                    </Header>

                    <List dataArray={[1,2,3]} renderRow={item => this.renderListRow(item)}>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default connect()(SearchComponent);