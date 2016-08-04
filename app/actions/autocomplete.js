import Api from '../api/Api';

export const AUTOCOMPLETE_ACTION = 'AUTOCOMPLETE_ACTION';
export function autocomplete(text) {
    return async dispatch => {
        const results = await Api.autocomplete.complete(text);
        return dispatch({
            type: AUTOCOMPLETE_ACTION,
            autocomplete: results || [text, []]
        });
    };
}