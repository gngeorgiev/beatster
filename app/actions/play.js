import api from '../api/Api';

export const PLAY_TRACK_ACTION = 'PLAY_TRACK_ACTION';
export const PAUSE_TRACK_ACTION = 'PAUSE_TRACK_ACTION';
export function play(track, isPlaying = true) {
    return async dispatch => {
        const resolvedTrack = await api.player.resolve(track.id, track.provider);
        resolvedTrack.previous = track.id;

        return dispatch({
            type: isPlaying ? PLAY_TRACK_ACTION : PAUSE_TRACK_ACTION,
            track: resolvedTrack,
            isPlaying
        });
    };
}

export function playNext(track) {
    return async dispatch => {
        const nextTrack = await api.player.resolve(track.next, track.provider);
        return dispatch(play(nextTrack));
    };
}

export function playPrevious(track) {
    return async dispatch => {
        const previousTrack = await api.player.resolve(track.previous, track.provider);
        return dispatch(play(previousTrack));
    };
}