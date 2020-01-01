import React, {Component} from 'react';

import Modules from './Modules';
const { ipcRenderer } = window.require('electron');

class Home extends Component {

    componentDidMount() {
        ipcRenderer.send('Home:PageLoaded');
    }
    
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