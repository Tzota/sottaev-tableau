// @flow

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {status, seconds, logString, keyStore, round, red, blue, redIsLeft, history, keyStoreHistory} from './reducers';
import {initialState} from './constants';

const logger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd();
    return result;
};

const middleWares = applyMiddleware(logger);
// const storeFactory = middleWares(createStore);

// const store	= storeFactory(
//     combineReducers({status, seconds, logString}),
//     initialState
// );


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({status, seconds, logString, keyStore, round, red, blue, redIsLeft, history, keyStoreHistory}),
    initialState,
    composeEnhancers(middleWares)
);

export default store;
