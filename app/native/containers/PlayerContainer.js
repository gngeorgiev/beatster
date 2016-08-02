import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';
import AudioPlayer from '../modules/AudioPlayer';
import {play, playNext, playPrevious} from '../../actions/play';
import {loading} from '../../actions/loading';

class PlayerComponent extends Component {
    async play(track) {
        this.props.dispatch(loading(true));
        await AudioPlayer.play(track.streamUrl);
        this.props.dispatch(loading(false));
    }

    async pause() {
        await AudioPlayer.pause();
    }

    componentDidMount() {
        AudioPlayer.onCompleted(() => this.props.dispatch(playNext(this.props.track)));
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
                marginBottom: 5,
                borderTopColor: 'black',
                borderTopWidth: 1
            }}
        >
            <Grid>
                <Col size={55}>
                    <Text style={{flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: 18}}>
                        {(track && track.title) || 'No track is playing'}
                    </Text>
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => dispatch(playPrevious(track))}
                        iconName="skip-previous"
                    />
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => dispatch(play(track, !isPlaying))}
                        iconName={isPlaying ? 'pause-circle-outline' : 'play-arrow'}
                    />
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => dispatch(playNext(track))}
                        iconName="skip-next"
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