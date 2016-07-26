import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {Content} from 'native-base';
import {connect} from 'react-redux';
import store from '../../store/store';
import {isEqual} from 'lodash';
import AudioPlayer from '../modules/AudioPlayer';

class PlayerComponent extends Component {
    constructor() {
        super();

        this.audioPlayer = new AudioPlayer();

        let lastTrack;
        store.subscribe(async () => {
            const {play} = store.getState();
            if (!isEqual(lastTrack, play.track) && play.track.streamUrl) {
                try {
                    await this.audioPlayer.play(play.track.streamUrl);
                    lastTrack = play.track;
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

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
                    <Text>{(track && track.title) || 'No track is playing'}</Text>
                </Col>
            </Grid>
        </Content>
    }
}

export default connect(state => ({
    track: state.play.track
}))(PlayerComponent);