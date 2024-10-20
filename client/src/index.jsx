import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';   // The word "thunk" is a programming term that means "a piece of code that does some delayed work". Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.
import reducers from './reducers';   // Reducers are functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState. (self made)

import App from './App'
import './index.css';

//compose --> Compose is used when you want to pass multiple store enhancers to the store. Store enhancers are higher order functions that add some extra functionality to the store. The only store enhancer which is supplied with Redux by default is applyMiddleware however many other are available.
//example of compose --> func1(func2(func3(func4)))) written as compose(func1, func2, func3, func4)

// createStore --> Creates a Redux store that holds the complete state tree of your app.

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);