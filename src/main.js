// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const { autoUpdater } = require('electron-updater');
autoUpdater.autoInstallOnAppQuit = false


const os = require('os-utils');
const path = require('path');

const spawn = require('child_process').execFile;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


let mainWindow;
let authWindow;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function openMainWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    show: false,
    backgroundColor: '#0F1220',
    width: 1328,
    height: 859,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    title:"Splash Tools",
    resizable:false,
    alwaysOnTop: false,
    icon:'src/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.removeMenu()
  mainWindow.loadFile('pages/index.html')
  //mainWindow.webContents.openDevTools()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    autoUpdater.checkForUpdatesAndNotify();
  })

  //CPU AND MEMORY METER
  var performance_interval = setInterval(() => {
    os.cpuUsage(function (v) {
      try {
        mainWindow.webContents.send("cpu", v * 100);
        mainWindow.webContents.send("mem", 100 - (os.freememPercentage() * 100));
      } catch {
        clearInterval(performance_interval)
      }
    });
  }, 1500);
}
function openAuthWindow() {
  authWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    show: false,
    width: 1328,
    height: 796,
    frame:false,
    backgroundColor: '#0F1220',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    title:"Splash Tools",
    resizable:false,
    alwaysOnTop: false,
    icon:'src/icon.ico',
    webPreferences: {
      nodeIntegration: true
    }

  })
  authWindow.removeMenu()
  authWindow.loadFile('pages/auth.html')
  //authWindow.webContents.openDevTools()
  authWindow.once('ready-to-show', () => {
    authWindow.show()
  })
}


async function startEngine() {
  spawn("engine/SplashTools-Engine.exe")
  let xhr = new XMLHttpRequest();

  console.log("starting engine")

  await sleep(1000)  

  xhr.open("GET","http://localhost:8081/auth")
  xhr.send()
  xhr.onload=function(){
    console.log("engine loaded")
    var auth_response = JSON.parse(xhr.responseText)
    if(auth_response["status"] == 0) {
      openMainWindow()
    } else {
      openAuthWindow()
    }
  }

}

app.whenReady().then(() => {
  startEngine()

  app.on('activate', function () {
    //MAC SUPPORT IN THE FUTURE
  })
})

ipcMain.on('auth', () => {
  openMainWindow()
  authWindow.close()
})


ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.on('download-progress', (progressObj) => {
  mainWindow.webContents.send('update_progress',progressObj.percent);
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});


app.on('window-all-closed', function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET","http://localhost:8081/terminate")
  xhr.send()
  xhr.onload=function(){
    if (process.platform !== 'darwin') app.quit()
  }
})

