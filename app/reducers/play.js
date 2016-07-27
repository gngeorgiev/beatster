import {PLAY_TRACK_ACTION, PAUSE_TRACK_ACTION} from '../actions/play';

export default function play(state = {
    track: {},
    isPlaying: false
}, action) {
    if (action.type === PLAY_TRACK_ACTION || action.type === PAUSE_TRACK_ACTION) {
        return {
            track: action.track,
            isPlaying: action.isPlaying
        };
    }

    return state;
}