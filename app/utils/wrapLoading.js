import {loading} from '../actions/loading';

let isLoading = false;
export default function (fn) {
    return dispatch => {
        if (!isLoading) {
            isLoading = true;
            loading(true);
        }

        fn(dispatch);

        if (isLoading) {
            isLoading = false;
            loading(false);
        }
    }
}