import {NativeModules} from 'react-native';

const {AudioPlayer} = NativeModules;

export default class AudioPlayerWrapper {
    currentPosition() {
        return AudioPlayer.getCurrentPosition();
    }

    resume() {
        return AudioPlayer.play('');
    }

    stop() {
        return AudioPlayer.stop();
    }

    play(url) {
        return AudioPlayer.play(url);
    }
}