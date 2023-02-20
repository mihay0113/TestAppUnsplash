import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware = [thunk];
const applier = (applyMiddleware(...middleware));

const store = createStore(rootReducer, applier);

export default store;