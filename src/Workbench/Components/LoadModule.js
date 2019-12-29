import React, {Component} from 'react';
const { ipcRenderer } = window.require('electron');

//import './Modules.css'

class LoadModule extends Component {
    constructor(props) {
        super(props);
        
        this.state = {ModuleToLoad: ''};
        this.Text = '';
        this.handleAddModule = this.handleAddModule.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ModuleToLoad: e.target.value});
    }

    handleAddModule(e) {
        e.preventDefault();

        if (!this.state.ModuleToLoad.length)
            return;

        const NewModule = {
            text: this.state.ModuleToLoad,
            id: Date.now()
        };

        ipcRenderer.send('Modules:LoadModule', [NewModule]);

        this.setState({ModuleToLoad: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleAddModule}>
                <label htmlFor="loadModule">
                    Load New Module
                </label>
                <input id="loadModule" onChange={this.handleChange} value={this.state.ModuleToLoad}/>
                <button>Load the Module</button>
            </form>
        );
    }
}

export default LoadModule;