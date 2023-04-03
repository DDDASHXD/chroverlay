import React from "react";
import "./WindowManager.scss";
import Window from "./window";

const WindowManager = (props) => {
  return (
    <div className="WindowManager">
      {props.windows.map((window, index) => (
        <Window
          label={window.label}
          href={window.href}
          type={window.type}
          id={window.id}
          removeWindow={(id) => props.removeWindow(id)}
          saveApp={(app) => props.saveApp(app)}
        />
      ))}
    </div>
  );
};

export default WindowManager;
