import React from "react";

const Window = (props) => {
  const [dragging, setDragging] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const window = React.useRef(null);

  const [oldCoords, setOldCoords] = React.useState({ x: 0, y: 0 });
  const [newCoords, setNewCoords] = React.useState({ x: 0, y: 0 });

  const [urlInput, setUrlInput] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleDrag = (e) => {
    if (dragging) {
      setCoords({
        x: newCoords.x + (e.clientX - oldCoords.x),
        y: newCoords.y + (e.clientY - oldCoords.y),
      });
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      setUrl(urlInput);
    }
  };

  React.useEffect(() => {
    setUrl(props.href);
  }, []);

  return (
    <div
      className={`window type-${props.type}`}
      ref={window}
      style={{
        //transform: `translate(${coords.x}px, ${coords.y}px)`,
        top: coords.y,
        left: coords.x,
      }}
    >
      <div
        className="titlebar"
        onMouseDown={(e) => {
          if (e.target.className === "search-input") {
            return;
          }
          setDragging(true);
          setOldCoords({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={(e) => {
          const windowBounds = window.current.getBoundingClientRect();
          setDragging(false);
          setNewCoords({ x: windowBounds.x, y: windowBounds.y });
        }}
        onMouseMove={(e) => handleDrag(e)}
        onMouseLeave={(e) => handleDrag(e)}
      >
        {props.type === "app" ? (
          <>{props.label}</>
        ) : (
          <div className="search">
            <input
              type="text"
              placeholder="Enter url..."
              className="search-input"
              onKeyUp={(e) => handleKeyUp(e)}
              onChange={(e) => setUrlInput(e.target.value)}
              defaultValue={props.href}
            />
          </div>
        )}
        <div
          className="close"
          onClick={() => props.removeWindow(props.id)}
        ></div>
      </div>
      <iframe title={props.label} src={url} frameborder="0"></iframe>
    </div>
  );
};

export default Window;
