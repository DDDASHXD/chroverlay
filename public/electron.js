const path = require("path");

const { app, BrowserWindow, globalShortcut } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
    transparent: true,
    frame: false,
    fullscreen: true,
    alwaysOnTop: true,
    webSecurity: false,
    skipTaskbar: true,
    resizable: false,
  });

  win.setAlwaysOnTop(true, "screen-saver");

  win.webContents.session.webRequest.onHeadersReceived(
    { urls: ["*://*/*"] },
    (d, c) => {
      if (d.responseHeaders["X-Frame-Options"]) {
        delete d.responseHeaders["X-Frame-Options"];
      } else if (d.responseHeaders["x-frame-options"]) {
        delete d.responseHeaders["x-frame-options"];
      }

      c({ cancel: false, responseHeaders: d.responseHeaders });
    }
  );

  const ret = globalShortcut.register("CommandOrControl+Tab", () => {
    if (win.isMinimized()) {
      win.maximize();
      win.focus();
    } else {
      win.minimize();
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
