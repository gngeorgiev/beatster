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
    state = {};

    componentDidMount() {
        this.setState({
            audioPlayer: new AudioPlayer(),
            isPlaying: false,
            currentTrack: null
        });

        store.subscribe(async () => {
            const {play} = store.getState();
            if (!isEqual(this.currentTrack, play.track) && play.track.streamUrl) {
                try {
                    this.play(play.track);
                    this.setState({currentTrack: play.track});
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }

    async play(track = this.state.currentTrack) {
        try {
            this.setState({isPlaying: true});
            await this.state.audioPlayer.play(track.streamUrl);
        } catch (e) {
            throw e;
        }
    }

    async pause() {
        try {
            this.setState({isPlaying: false});
            await this.state.audioPlayer.pause();
        } catch (e) {
            throw e;
        }
    }

    togglePlayPause() {
        this.state.isPlaying ? this.pause() : this.play();
    }

    render() {
        const {currentTrack} = this.state;
        const playIcon = this.state.isPlaying ? 'pause-circle-outline' : 'play-arrow';

        return <Content>
            <Grid>
                <Col size={55}>
                    <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 15}}>
                        {(currentTrack && currentTrack.title) || 'No track is playing'}
                    </Text>
                </Col>
                <Col size={15}>
                    <IconButton iconName="skip-previous"/>
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => this.togglePlayPause()}
                        iconName={playIcon}
                    />
                </Col>
                <Col size={15}>
                    <IconButton iconName="skip-next"/>
                </Col>
            </Grid>
        </Content>
    }
}

export default connect(state => ({
    track: state.play.track
}))(PlayerComponent);