import {NativeModules, DeviceEventEmitter} from 'react-native';

const {AudioPlayer} = NativeModules;

export class AudioPlayerWrapper {
    constructor() {
        DeviceEventEmitter.addListener('OnCompleted', this._onCompletedCb);
    }

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

    onCompleted(cb) {
        this._onCompletedCb = cb;
    }
}

export default new AudioPlayerWrapper();