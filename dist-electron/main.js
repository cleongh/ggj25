import { app, BrowserWindow } from "electron";
app.whenReady().then(() => {
  const win = new BrowserWindow();
  win.setMenu(null);
  console.log("ates");
  win.loadFile("index.electron.html");
  console.log("vale");
  win.webContents.openDevTools();
});
