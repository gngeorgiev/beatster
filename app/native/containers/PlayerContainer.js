import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconButton from '../components/common/IconButton';
import {Grid, Col} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';
import AudioPlayer from '../modules/AudioPlayer';
import {play} from '../../actions/play';

class PlayerComponent extends Component {
    async play(track) {
        await AudioPlayer.play(track.streamUrl);
    }

    async pause() {
        await AudioPlayer.pause();
    }

    render() {
        const {track, isPlaying, dispatch} = this.props;
        if (isPlaying) {
            this.play(track);
        } else {
            this.pause();
        }

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
                    <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 15}}>
                        {(track && track.title) || 'No track is playing'}
                    </Text>
                </Col>
                <Col size={15}>
                    <IconButton iconName="skip-previous"/>
                </Col>
                <Col size={15}>
                    <IconButton
                        onPress={() => dispatch(play(track, !isPlaying))}
                        iconName={isPlaying ? 'pause-circle-outline' : 'play-arrow'}
                    />
                </Col>
                <Col size={15}>
                    <IconButton iconName="skip-next"/>
                </Col>
            </Grid>
        </View>
    }
}

export default connect(state => ({
    track: state.play.track,
    isPlaying: state.play.isPlaying
}))(PlayerComponent);