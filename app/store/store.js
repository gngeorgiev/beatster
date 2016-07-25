import reducers from '../reducers/reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger();
const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk, promise, logger)
    )
);

export default store;
