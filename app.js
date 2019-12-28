// Import electron app core
const {app} = require('electron');

//Import Window
const Window =  require('./Window')

function main() {
    let WorkbenchWindow = new Window({file: 'index.html'});
}

app.setAppUserModelId(process.execPath);
app.on('ready', main);
app.on('window-all-closed', function () {
    app.quit();
});