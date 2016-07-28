import api from '../api/Api';
import wrapLoading from '../utils/wrapLoading';

export const PLAY_TRACK_ACTION = 'PLAY_TRACK_ACTION';
export const PAUSE_TRACK_ACTION = 'PAUSE_TRACK_ACTION';
export function play(track, isPlaying = true) {
    return wrapLoading(async dispatch => {
        const resolvedTrack = await api.player.resolve(track.id, track.provider);

        return dispatch({
            type: isPlaying ? PLAY_TRACK_ACTION : PAUSE_TRACK_ACTION,
            track: resolvedTrack,
            isPlaying
        });
    });
}