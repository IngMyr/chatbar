import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './rootReducer'; //Import the root reducer

/**
 * In this file we will create our redux store by 
 * importing our root reducer and injecting our store enhancers, 
 * i.e. Redux Thunk.
 */

const enhancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enhancer);