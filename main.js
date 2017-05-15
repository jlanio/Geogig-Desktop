const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden', 
    show: false,
    width: 1224, 
    height: 600, 
    resizable: false
  })
  var splash = new BrowserWindow({ 
    backgroundColor: '#2e2c29',
    width: 600, 
    height: 500,
    frame: false/*,
    transparent: true*/
  });
  splash.loadURL('https://s-media-cache-ak0.pinimg.com/originals/cb/05/42/cb05420fec7a12bb752da11df0fb553f.gif')
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
   mainWindow.once('ready-to-show', () => {
    setTimeout(function(){ 
        splash.close();
        mainWindow.show();
    }, 7000);
})
  /*mainWindow.webContents.openDevTools()*/
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
