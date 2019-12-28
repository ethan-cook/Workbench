const {BrowserWindow} = require('electron');

// Default Window settings
const DefaultProps = {
    width: 1280,
    height: 720,
    show: false
}

class Window extends BrowserWindow 
{    
    constructor({file, ...windowSettings}) {
        // Calls the BrowserWindow constructor and passes the props
        super({...DefaultProps, ...windowSettings});

        //load the html and open dev tools
        this.loadFile(file);
        this.webContents.openDevTools();

        //Show the window once it has rendered
        this.once('ready-to-show', () => {
            this.show();
        });
    };
};

module.exports = Window;