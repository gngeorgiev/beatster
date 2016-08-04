import {combineReducers} from 'redux';

import {routerReducer} from 'react-native-redux-router';
import search from './search';
import play from './play';
import loading from './loading';
import autocomplete from './autocomplete';

export default combineReducers({
    routerReducer,
    search,
    play,
    loading,
    autocomplete
});