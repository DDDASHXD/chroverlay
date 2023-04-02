import Apps from "./components/Apps/Apps";
import "./style/main.scss";
import React from "react";
import WindowManager from "./components/WindowManager/WindowManager";

function App() {
  const [windows, setWindows] = React.useState([]);
  const spawnWindow = (app) => {
    setWindows([...windows, { ...app, id: windows.length }]);
  };

  const removeWindow = (id) => {
    const filter = windows.filter((window) => window.id !== id);
    setWindows(filter);
  };

  return (
    <div className="App">
      <Apps spawnWindow={(app) => spawnWindow(app)} />
      <WindowManager
        windows={windows}
        setWindows={(app) => setWindows(app)}
        removeWindow={(id) => removeWindow(id)}
      />
      <p>Chroverlay Alpha Build</p>
    </div>
  );
}

export default App;
