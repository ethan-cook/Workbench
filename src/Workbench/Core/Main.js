const {app, BrowserWindow, Menu, ipcMain, remote, dialog} = require('electron');

const path = require('path');
const url = require('url');
const fs = require('fs');

// Global reference to the main application window
let WorkbenchWindow;

// Array of the data for our current loaded modules
let LoadedModules = [];

//Connect to React  
const StartURL = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production')
{
    StartURL = url.format({
        pathname: path.join(__dirname, '/../../../build/index.html'),
        protocol: 'file',
        slashes: true
    });
}


process.env.NODE_ENV = 'development';

//Create the main window for Workbench
function createWorkbenchWindow()
{
    //Create new Workbench window
    WorkbenchWindow = new BrowserWindow({
        width: 1280, 
        height: 720, 
        icon: path.join(__dirname, '/../../../public/icons/WorkbenchLogo.ico'),
        title: "Workbench",
        show: false,
        backgroundColor: '#3a3c40',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //Load the React page
    WorkbenchWindow.loadURL(StartURL);

    //Create event handler for when the window is closed
    WorkbenchWindow.on('closed', () => {
        WorkbenchWindow = null;
    });

    //Wait until the page has fully loaded the page, then show the window
    WorkbenchWindow.once('ready-to-show', () => {
        WorkbenchWindow.show();
    })
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
                label: 'Home',
                click() {
                    WorkbenchWindow.loadURL(StartURL);
                }
            },
            {
                label: 'Load New Module',
                click() {
                    LoadNewModule();
                }
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

// Load each module in the Modules.json file
function LoadModules()
{
    //Read the modules.json file
    fs.readFile('modules.json', 'utf8', (error, data) => {
        if (error)
        {
            throw(error);
        }

        if (data != '')
        {
            //Parse the JSON from the file, then add each entry to LoadedModules, and push it to React
            var ModuleJSON = JSON.parse(data);
            ModuleJSON.forEach((Module) => {
                ModuleJSON.push(Module);
                WorkbenchWindow.webContents.send('Modules:ModuleLoaded', [Module]);
            });   
        }     
    })
}

//Load a new module from a file
function LoadNewModule()
{
    //Open the system dialog to select a file
    dialog.showOpenDialog(WorkbenchWindow, {filters: [{name: 'Module Config', extensions: ['json', 'txt']}], properties: ['openFile']}).then(result => {
        //Read the file the user selected
        fs.readFile(result.filePaths[0], 'utf8', (error, data) => {
            if (error)
            {
                throw(error);
            }

            //Parse the JSON from the module file selected
            var ModuleJSON = JSON.parse(data);
            console.log(ModuleJSON);
            //Create the Module structure from the file data
            const NewModule = {
                text: ModuleJSON.name,
                url: ModuleJSON.url,
                id: Date.now()
            };
            //Pass the new module to the LoadedModules array
            LoadedModules.push(NewModule);
            //Notify React of the new module
            WorkbenchWindow.webContents.send('Modules:ModuleLoaded', [NewModule]);

            //Update the modules.json file with the new contents of LoadedModules
            fs.writeFile('modules.json', JSON.stringify(LoadedModules), (error) => {
                if (error)
                {
                    throw(error);
                }
                console.log("Modules config saved!");
            })
        });
    }).catch(error => {
        console.log(error);
    });
}

ipcMain.on('Home:PageLoaded', (event) => {
    LoadModules();
});

ipcMain.on('Modules:LoadModule', (event, ModuleLoading) => {
    //Tell the home menu that we loaded a new module
    WorkbenchWindow.webContents.send('Modules:ModuleLoaded', ModuleLoading);
})


