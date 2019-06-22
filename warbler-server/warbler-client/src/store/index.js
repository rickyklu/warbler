import rootReducer from "./reducers";
// compose allows function to be combined together
// applyMiddleware makes easier to apply thunk middlewaire
// thunk allows delaying evaluations of functions
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export function configureStore(){
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            // used to redux dev tools debugging below
            //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            window.devToolsExtension ? window.devToolsExtension(): f => f
        )
    );

    return store;
}

