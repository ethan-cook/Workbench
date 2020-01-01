import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './Workbench/Components/Home';
import ToDoList from './Workbench/Components/ToDoList';

import './index.css';

const Routing = (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path='/ToDoList' component={ToDoList}/>
        </div>
    </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));
