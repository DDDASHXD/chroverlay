const path = require("path");
const IOverlay = require("electron-overlay");
const fs = require("fs");

const { app, BrowserWindow, globalShortcut } = require("electron");
const isDev = require("electron-is-dev");

IOverlay.start();
IOverlay.setHotkeys([
  {
    name: "overlay.toggle",
    keyCode: 113,
    modifiers: { ctrl: true },
  },
]);
IOverlay.setEventCallback((event, payload) => {
  if (event === "game.input") {
    const window = BrowserWindow.fromId(payload.windowId);
    if (window) {
      const inputEvent = IOverlay.translateInputEvent(payload);
      if (payload.msg !== 512) {
        console.log(event, payload);
        console.log(`translate ${JSON.stringify(inputEvent)}`);
      }

      if (inputEvent) {
        window.webContents.sendInputEvent(inputEvent);
      }

      const focusWin = BrowserWindow.fromId(payload.focusWindowId);
      if (focusWin) {
        focusWin.focusOnWebView();
      }
    }
  }
});

function createWindow() {
  // Create the browser window.
  screen = require("electron").screen;
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      offscreen: true,
    },
    transparent: true,
    frame: false,
    title: "chroverlay",
  });
  addOverlayWindows("chroverlay", win, 0, 0, true);

  win.webContents.on("paint", (event, dirty, image) => {
    IOverlay.sendFrameBuffer(
      win.id,
      image.getBitmap(),
      image.getSize().width,
      image.getSize().height
    );
  });

  win.on("resize", () => {
    IOverlay.sendWindowBounds(window.id, { rect: window.getBounds() });
  });

  fs.writeFileSync(
    "process.json",
    JSON.stringify(IOverlay.getTopWindows(true))
  );

  let process;
  for (let i = 0; i < IOverlay.getTopWindows(true).length; i++) {
    const element = IOverlay.getTopWindows(true)[i];
    if (element.title.includes("GameWindow")) {
      process = element;
    }
  }
  if (process) {
    console.log("inject:" + IOverlay.injectProcess(process));
  }

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  let window = null;
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

const addOverlayWindows = (
  name,
  window,
  dragborder = 0,
  captionHeight = 0,
  transparent = false
) => {
  const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  IOverlay.addWindow(window.id, {
    name,
    transparent,
    resizable: window.isResizable(),
    maxWidth: window.isResizable
      ? display.bounds.width
      : window.getBounds().width,
    maxHeight: window.isResizable
      ? display.bounds.height
      : window.getBounds().height,
    minWidth: window.isResizable ? 100 : window.getBounds().width,
    minHeight: window.isResizable ? 100 : window.getBounds().height,
    nativeHandle: window.getNativeWindowHandle().readUInt32LE(0),
    rect: window.getBounds(),
    caption: {
      left: dragborder,
      right: dragborder,
      top: dragborder,
      height: captionHeight,
    },
    dragBorderWidth: dragborder,
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
