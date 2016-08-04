import {AUTOCOMPLETE_ACTION} from '../actions/autocomplete';

export default function autocomplete(state = [], action) {
    if (action.type === AUTOCOMPLETE_ACTION) {
        return action.autocomplete[1] || []; //the 0 index contains the search term, the second - the results
    }

    return state;
}