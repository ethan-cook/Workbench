const net = require('net');
const port = process.env.port ? (process.env.port - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const Client = new net.Socket();

let StartedElectron = false;
const TryConnection = () => Client.connect({port: port}, () => {
    Client.end();
    if (!StartedElectron)
    {
        console.log('Starting Electron...');
        StartedElectron = true;
        const Exec = require('child_process').exec;
        Exec('npm run electron');
    }
});

TryConnection();

Client.on('error', (error) => {
    setTimeout(TryConnection, 1000);
});