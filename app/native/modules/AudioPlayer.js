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

    play(url) {
        return AudioPlayer.play(url);
    }

    download({streamUrl, title, id, provider}) {
        return AudioPlayer.saveToFile(streamUrl, title, id, provider);
    }
}

export default new AudioPlayerWrapper();