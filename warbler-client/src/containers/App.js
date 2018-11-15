import React, { Component } from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar"
// router to navigate from page to page

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
            </div>
        </Router>
    </Provider> 
);

export default App;
