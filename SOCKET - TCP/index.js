const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const net = require('net');

let client;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true, // Mantém o contexto isolado
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('tcp-connect', (event, { host, port }) => {
    client = new net.Socket();
    client.connect(port, host, () => {
        console.log('Conectado ao servidor');
        event.reply('tcp-status', 'Conectado ao servidor');
    });

    client.on('data', (data) => {
        console.log('Recebido do servidor:', data.toString());
        event.reply('tcp-data', data.toString());
    });

    client.on('close', () => {
        console.log('Conexão fechada');
        event.reply('tcp-data', '');
        event.reply('tcp-status', 'Conexão fechada');
    });

    client.on('error', (err) => {
        console.error('Erro:', err);
        event.reply('tcp-data', '');
        event.reply('tcp-status', `Erro: ${err.message}`);
    });
});

ipcMain.on('tcp-send', (event, message) => {
    if (client && client.writable) {
        client.write(message, () => {
            console.log('Mensagem enviada ao servidor:', message);
        });
    } else {
        event.reply('tcp-data', '');
        event.reply('tcp-status', 'Erro: Não conectado ao servidor');
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});