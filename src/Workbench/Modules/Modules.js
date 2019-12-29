const {BrowserWindow} = require('electron');

let ModuleWindow;

function createModuleWindow() {
    //Create the Module Window
    ModuleWindow = new BrowserWindow({
        width: 300, 
        height: 200, 
        title: 'Load Modules',
        resizable: false,
        minimizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    const WindowURL = 'http://localhost:3000/LoadModule';
    if (process.env.NODE_ENV === 'production')
    {
        WindowURL = url.format({
            pathname: path.join(__dirname, '/../../../build/index.html/LoadModule'),
            protocol: 'file',
            slashes: true
        });
    }
    
    //Load the React page for Loading Modules
    ModuleWindow.loadURL(WindowURL);
    
    //Remove the menu on this window
    ModuleWindow.setMenu(null);

    // Event handler for if this window is closed
    ModuleWindow.on('close', () => {
        ModuleWindow = null;
    });
}

//Exports to be handled by the main process
module.exports = {'createModuleWindow': createModuleWindow};