import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar"
import Main from "./Main"
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";
// router to navigate from page to page

const store = configureStore();

// check if token already exists
// allows repopulating state with current user
if(localStorage.jwtToken){
    // set it to all future requests
    setAuthorizationToken(localStorage.jwtToken);

    // prevent someone manually tampering with key
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch(e) {
        store.dispatch(setCurrentUser({}));
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
                <Main />
            </div>
        </Router>
    </Provider> 
);

export default App;
