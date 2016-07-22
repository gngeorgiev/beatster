import {PLAY_TRACK_ACTION} from '../actions/play';

export default function play(state = {track: {}}, action) {
    if (action.type === PLAY_TRACK_ACTION) {
        return {
            track: action.track
        };
    }

    return state;
}