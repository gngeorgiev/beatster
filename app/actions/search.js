import api from '../api/Api';

export const SEARCH_RESULTS_ACTION = 'SEARCH_RESULTS_ACTION';
export function search(query) {
    return async dispatch => {
        const searchResults = await api.player.search(query);

        return dispatch({
            type: SEARCH_RESULTS_ACTION,
            searchResults
        });
    };
}