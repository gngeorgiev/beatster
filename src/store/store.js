import {routerReducer} from 'react-native-redux-router';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({routerReducer}));

export default store;
