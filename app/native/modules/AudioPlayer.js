import {NativeModules} from 'react-native';

const {AudioPlayer} = NativeModules;

export default class AudioPlayerWrapper {
    play(url) {
        return AudioPlayer.play(url);
    }
}