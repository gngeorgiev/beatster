import api from '../api/Api';
import wrapLoading from '../utils/wrapLoading';

export const PLAY_TRACK_ACTION = 'PLAY_TRACK_ACTION';
export const PAUSE_TRACK_ACTION = 'PAUSE_TRACK_ACTION';
export function play(track, isPlaying = true) {
    return wrapLoading(async dispatch => {
        if (!track.streamUrl) {
            const {streamUrl} = await api.player.resolve(track.id, track.provider);
            track.streamUrl = streamUrl;
        }

        return dispatch({
            type: isPlaying ? PLAY_TRACK_ACTION : PAUSE_TRACK_ACTION,
            track,
            isPlaying
        });
    });
}