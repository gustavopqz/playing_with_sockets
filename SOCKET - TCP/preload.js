const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    connectToServer: (host, port) => ipcRenderer.send('tcp-connect', { host, port }),
    sendMessage: (message) => ipcRenderer.send('tcp-send', message),
    onStatus: (callback) => ipcRenderer.on('tcp-status', (event, status) => callback(status)),
    onData: (callback) => ipcRenderer.on('tcp-data', (event, data) => callback(data))
});