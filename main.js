// import index from "./index.html?url"

// // src/rendere/src/main.js
// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// function createWindow() {
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         // webPreferences: {
//         //     preload: path.join(__dirname, 'preload.js'),
//         //     contextIsolation: true,
//         // },
//     });
//     // Adjust port if needed
//     // mainWindow.loadURL('http://localhost:3000');


//     win.loadFile("./index.html")
// }

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });
// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });

import { app, BrowserWindow /* globalShortcut */ } from 'electron'
// import * as path from 'path'



// // Let electron reloads by itself
// if (process.env.ELECTRON_DEBUG === 'true' || process.env.ELECTRON_DEBUG === 'vscode') {
//     // tslint:disable-next-line:no-var-requires
//     require('electron-reload')('.');
// }

app.whenReady().then(() => {
    const win = new BrowserWindow()

    win.setMenu(null);

    // globalShortcut.register('Ctrl+Shift+I', () => {
    //     win.webContents.toggleDevTools();
    // });


    // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
    // if (process.env.VITE_DEV_SERVER_URL) {
    //     win.loadURL(process.env.VITE_DEV_SERVER_URL + "index.electron.html")
    // } else {
    //     // Load your file
    //     win.loadFile('index.electron.html');

    // }
    console.log('ates');

    // and load the index.html of the app.
    win.loadFile('index.electron.html');
    console.log('vale');

    win.webContents.openDevTools()


})