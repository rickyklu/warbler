import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            // used to redux dev tools debugging below
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
            // window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}
