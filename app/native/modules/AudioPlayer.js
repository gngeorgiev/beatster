import {NativeModules} from 'react-native';

const {AudioPlayer} = NativeModules;

export class AudioPlayerWrapper {
    currentPosition() {
        return AudioPlayer.getCurrentPosition();
    }

    resume() {
        return AudioPlayer.play('');
    }

    pause() {
        return AudioPlayer.pause();
    }

    stop() {
        return AudioPlayer.stop();
    }

    play(url, name) {
        return AudioPlayer.play(url, name);
    }
}

export default new AudioPlayerWrapper();