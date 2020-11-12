import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(
    rootReducer, 
    window.devToolsExtension && window.devToolsExtension()
);

export default store;