import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconButton from './common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {Content} from 'native-base';

export default class PlayerComponent extends Component {
    render() {
        return <Content>
            <Grid>
                <Col size={15}>
                    <IconButton iconName="skip-previous"/>
                </Col>
                <Col size={15}>
                    <IconButton iconName="play-arrow"/>
                </Col>
                <Col size={15}>
                    <IconButton iconName="skip-next"/>
                </Col>
                <Col size={55}>
                    <Text>TITLE</Text>
                </Col>
            </Grid>
        </Content>
    }
}