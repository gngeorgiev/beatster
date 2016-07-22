import PluginsRegistry from '../plugins/PluginsRegistry';

export const SEARCH_RESULTS_ACTION = 'SEARCH_RESULTS_ACTION';
export function search(query) {
    return async dispatch => {
        const p = PluginsRegistry.getPlugins()[0];

        const searchResults = await p.search(query);

        return dispatch({
            type: SEARCH_RESULTS_ACTION,
            searchResults
        });
    };
}