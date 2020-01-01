import React, {Component} from 'react';
const {ipcRenderer} = window.require('electron');

class Modules extends Component {
    constructor(props) {
        super(props);
        
        this.state = {LoadedModules: []};
    }

    componentDidMount() {
        ipcRenderer.on('Modules:ModuleLoaded', (event, ModuleLoading) => {
            //Add the new module to the LoadedModules Array
            this.state.LoadedModules.push(ModuleLoading[0]);
            //Update the State with the new array
            this.setState({LoadedModules: this.state.LoadedModules});
        });
    }

    render() {
        return (
            <div className="Modules">
                <h4>Current Loaded Modules: {this.state.LoadedModules.length}</h4>
                <ul>
                    {this.state.LoadedModules.map(ModuleLoaded => (
                        <a href={ModuleLoaded.url}><li key={ModuleLoaded.id}>{ModuleLoaded.text}</li></a>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Modules;