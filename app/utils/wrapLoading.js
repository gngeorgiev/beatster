import {loading} from '../actions/loading';

export default function (fn) {
    return dispatch => {
        loading(true);
        fn(dispatch);
        loading(false);
    }
}