import {SEARCH_RESULTS_ACTION} from '../actions/search';

export default function search(state = [], action) {
    if (action.type === SEARCH_RESULTS_ACTION) {
        return action.searchResults;
    }

    return state;
}