import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import Home from './Workbench/Components/Home.js';
import LoadModule from './Workbench/Components/LoadModule';
import * as serviceWorker from './serviceWorker';

const Routing = (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/LoadModule" component={LoadModule}/>
        </div>
    </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
