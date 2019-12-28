const {app, BrowserWindow, Menu, ipcMain} = require('electron');

const path = require('path');
const url = require('url');

// Global reference to the main application window
let WorkbenchWindow;

//Create the main window for Workbench
function createWorkbenchWindow()
{
    //Create new Workbench window
    WorkbenchWindow = new BrowserWindow({width: 1280, height: 720});

    //Connect to React
    const StartURL = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file',
        slashes: true
    });

    //Load the React page
    WorkbenchWindow.loadURL(StartURL);

    //Open the devTools
    WorkbenchWindow.openDevTools();

    //Create event handler for when the window is closed
    WorkbenchWindow.on('closed', () => {
        WorkbenchWindow = null;
    });
}

//Once the application is ready, create the main Workbench Window
app.on('ready', () => {
    createWorkbenchWindow();
});

//Create event handler to quit if all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
})

app.on('activate', () => {
    if (WorkbenchWindow === null)
    {
        createWorkbenchWindow();
    }
})