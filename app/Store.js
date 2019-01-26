import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers';

// snippet for debugging store (not for production)
// thunkMiddleware for async operation
const enhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);

const initStore = initialState => createStore(reducers, initialState, enhancer);

export default initStore;
