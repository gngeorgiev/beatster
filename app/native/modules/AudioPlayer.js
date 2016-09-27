import {NativeModules} from 'react-native';

const {AudioPlayer} = NativeModules;

const AudioPlayerWrapper = {
    currentPosition() {
        return AudioPlayer.getCurrentPosition();
    },

    resume() {
        return AudioPlayer.play('');
    },

    pause() {
        return AudioPlayer.pause();
    },

    stop() {
        return AudioPlayer.stop();
    },

    play(url, offline) {
        if (typeof offline !== 'boolean') {
            offline = false;
        }

        return AudioPlayer.play(url, offline);
    },

    download({streamUrl, title, id, provider, thumbnail}) {
        return AudioPlayer.saveToFile(streamUrl, title, id, provider, thumbnail);
    },

    getDownloadsFolder() {
        return AudioPlayer.getDownloadsFolderPath();
    },
};

export default AudioPlayerWrapper;