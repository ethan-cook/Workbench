import React, {Component} from 'react';
import './Home.css'

import Modules from './Modules';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <h1>Welcome to Workbench!</h1>
                <Modules/>
            </div>
        );
    }
}

export default Home;