import {combineReducers} from 'redux';

import {routerReducer} from 'react-native-redux-router';
import search from './search';
import play from './play';

export default combineReducers({
    routerReducer,
    search,
    play
});