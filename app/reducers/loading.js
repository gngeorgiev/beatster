import {START_LOADING_ACTION, STOP_LOADING_ACTION} from '../actions/loading';

export default function loading(state = false, action) {
    if (action.type === START_LOADING_ACTION || action.type === STOP_LOADING_ACTION) {
        return action.isLoading;
    }

    return state;
}