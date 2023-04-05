import React from "react";
import WebApp from "./WebApp";
import "./Apps.scss";
import { useEffect } from "react";
import { addApp, getApps } from "../../storage/storage";

const Apps = (props) => {
  const container = React.useRef(null);
  const [gridHovered, setGridHovered] = React.useState(false);
  const [indicatorCoords, setIndicatorCoords] = React.useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  const handleMouseEnter = (e) => {
    const target = e.currentTarget.getBoundingClientRect();
    const containerBounds = container.current.getBoundingClientRect();

    setIndicatorCoords({
      x: target.x - containerBounds.x,
      y: target.y - containerBounds.y,
      w: target.width,
      h: target.height,
    });
  };

  const handleClick = (e, app) => {
    if (
      e.currentTarget.className == e.target.className ||
      e.target.className === "clickRegion"
    ) {
      props.spawnWindow(app);
    }
  };

  return (
    <div className="Apps">
      <h1>Your apps</h1>
      <div
        className="grid"
        ref={container}
        onMouseEnter={() => setGridHovered(true)}
        onMouseLeave={() => setGridHovered(false)}
      >
        <div
          className={`indicator ${gridHovered ? "active" : ""}`}
          style={{
            left: indicatorCoords.x,
            top: indicatorCoords.y,
            width: indicatorCoords.w,
            height: indicatorCoords.h,
          }}
        ></div>
        {props.apps.map((app, index) => (
          <WebApp
            index={index}
            handleMouseEnter={(e) => handleMouseEnter(e)}
            handleClick={(e) => handleClick(e, app)}
            icon={app.icon}
            label={app.label}
            id={app.id}
            deleteApp={(id) => props.deleteApp(id)}
            noDelete={app.noDelete}
            setName={(id, name) => props.setName(id, name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Apps;
