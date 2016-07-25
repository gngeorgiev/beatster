import api from '../api/Api';

export const PLAY_TRACK_ACTION = 'PLAY_TRACK_ACTION';
export function play(track) {
    return async dispatch => {
        const resolvedTrack = await api.player.resolve(track.id, track.provider);

        return dispatch({
            type: PLAY_TRACK_ACTION,
            track: resolvedTrack
        });
    };
}