export const START_LOADING_ACTION = 'START_LOADING_ACTION';
export const STOP_LOADING_ACTION = 'STOP_LOADING_ACTION';
export function loading(isLoading) {
    return dispatch => {
        return dispatch({
            type: isLoading ? START_LOADING_ACTION : STOP_LOADING_ACTION,
            isLoading
        });
    };
}