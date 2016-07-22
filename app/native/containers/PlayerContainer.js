import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {Content} from 'native-base';
import {connect} from 'react-redux';

class PlayerComponent extends Component {
    render() {
        const {track} = this.props;

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
                    <Text>{track.title || 'No track is playing'}</Text>
                </Col>
            </Grid>
        </Content>
    }
}

export default connect(state => ({
    track: state.track
}))(PlayerComponent);