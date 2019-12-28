const {app, BrowserWindow, Menu, ipcMain} = require('electron');

const path = require('path');
const url = require('url');

// Global reference to the main application window
let WorkbenchWindow;

process.env.NODE_ENV = 'development';

//Create the main window for Workbench
function createWorkbenchWindow()
{
    //Create new Workbench window
    WorkbenchWindow = new BrowserWindow({width: 1280, height: 720, icon: path.join(__dirname, '/../public/icons/WorkbenchLogo.ico')});

    //Connect to React
    const StartURL = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file',
        slashes: true
    });

    //Load the React page
    WorkbenchWindow.loadURL(StartURL);

    //Create event handler for when the window is closed
    WorkbenchWindow.on('closed', () => {
        WorkbenchWindow = null;
    });
}

//Once the application is ready, setup all core window functions
app.on('ready', () => {
    createWorkbenchWindow();

    //Build a menu object from the WorkbenchMenuTemplate, then set it active
    const WorkbenchMenu = Menu.buildFromTemplate(WorkbenchMenuTemplate);
    Menu.setApplicationMenu(WorkbenchMenu);
});

//Create event handler to quit if all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
})

//If app regains focus, and the WorkbenchWindow is not created, make it. (macOS)
app.on('activate', () => {
    if (WorkbenchWindow === null)
    {
        createWorkbenchWindow();
    }
})

//Template for the main Workbench menu
const WorkbenchMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Menu 1'
            },
            {
                label: 'Menu 2'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

//Add Dev tools menu item if we are not a production build
if (process.env.NODE_ENV !== 'production')
{
    WorkbenchMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}