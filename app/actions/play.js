import PluginsRegistry from '../plugins/PluginsRegistry';

export const PLAY_TRACK_ACTION = 'PLAY_TRACK_ACTION';
export function play(track) {
    return async dispatch => {
        const p = PluginsRegistry.getPlugins()[0];

        const resolvedTrack = await p.resolve(track);

        return dispatch({
            type: PLAY_TRACK_ACTION,
            track: resolvedTrack
        });
    };
}