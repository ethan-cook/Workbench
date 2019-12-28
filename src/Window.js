const {BrowserWindow} = require('electron');
const path = require('path');

// Default Window settings
const DefaultProps = {
    width: 1280,
    height: 720,
    show: false,
    icon: path.join(__dirname, '/assets/icons/WorkbenchLogo.png'),
    backgroundColor: '#3a3c40',
}

class Window extends BrowserWindow 
{    
    constructor({file, url, ...windowSettings}) {
        // Calls the BrowserWindow constructor and passes the props
        super({...DefaultProps, ...windowSettings});

        //load the html and open dev tools
        if (file != null)
        {
            this.loadFile(file);

        }
        else if (url != null)
        {
            this.loadURL(url);
        }
        
//        this.webContents.openDevTools();

        //Show the window once it has rendered
        this.once('ready-to-show', () => {
            this.show();
        });
    };
};

module.exports = Window;