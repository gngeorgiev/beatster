import React, {Component} from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';
import AudioPlayer from '../modules/AudioPlayer';
import {play, playNext, playPrevious} from '../../actions/play';

class PlayerComponent extends Component {
    async play(track) {
        let urlOrId;

        if (track.offline) {
            urlOrId = track.id;
        } else {
            urlOrId = track.streamUrl;
        }

        await AudioPlayer.play(urlOrId, track.offline);
    }

    async pause() {
        await AudioPlayer.pause();
    }

    async download(track) {
        await AudioPlayer.download(track)
    }

    componentDidMount() {
        this._completedListener = DeviceEventEmitter.addListener('OnCompleted', () => this.props.dispatch(playNext(this.props.track)));
    }

    componentWillUnmount() {
        this._completedListener.remove();
        this._completedListener = null;
    }

    componentWillReceiveProps(props) {
        const {isPlaying, track} = props;
        if (isPlaying) {
            this.play(track);
        } else {
            this.pause();
        }
    }

    render() {
        const {track, isPlaying, dispatch} = this.props;

        return <View
            style={{
                marginTop: 2,
                marginBottom: 5
            }}
        >
            <Grid>
                <Col size={60}>
                    <Text style={{flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: 15}}>
                        {(track && track.title) || 'No track is playing'}
                    </Text>
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => this.download(track)} //TODO: feedback
                        iconName="file-download"
                    />
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => dispatch(playNext(track))}
                        iconName="skip-next"
                    />
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => dispatch(play(track, !isPlaying))}
                        iconName={isPlaying ? 'pause-circle-outline' : 'play-arrow'}
                    />
                </Col>
            </Grid>
        </View>
    }
}

export default connect(state => ({
    track: state.play.track,
    isPlaying: state.play.isPlaying
}))(PlayerComponent);