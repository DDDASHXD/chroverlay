import React from "react";
import { ChevronLeft, ChevronRight, Reload } from "tabler-icons-react";

const Window = (props) => {
  const [dragging, setDragging] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const window = React.useRef(null);

  const [oldCoords, setOldCoords] = React.useState({ x: 0, y: 0 });
  const [newCoords, setNewCoords] = React.useState({ x: 0, y: 0 });

  const [urlInput, setUrlInput] = React.useState("");
  const [url, setUrl] = React.useState("");

  const [currentTitle, setCurrentTitle] = React.useState("");

  const webFrame = React.useRef(null);

  const [addModal, setAddModal] = React.useState(false);

  const [focus, setFocus] = React.useState(false);

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
      if (!urlInput.includes("http://") || !urlInput.includes("https://")) {
        setUrl(`https://${urlInput}`);
      } else if (!urlInput.includes(".")) {
        setUrl(`https://www.google.com/search?q=${urlInput}`);
      } else {
        setUrl(urlInput);
      }
    }
  };

  React.useEffect(() => {
    setUrl(props.href);
    webFrame.current.addEventListener("did-navigate", (event) => {
      setUrlInput(event.url);
    });

    webFrame.current.addEventListener("page-title-updated", (event) => {
      setCurrentTitle(event.title);
    });
  }, []);

  const saveNewApp = () => {
    props.saveApp({
      label: currentTitle,
      href: urlInput,
      type: "app",
      icon: "data:image/png;base64,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",
    });
    setAddModal(false);
  };

  return (
    <div
      className={`window type-${props.type} ${focus ? "focused" : ""}`}
      ref={window}
      style={{
        //transform: `translate(${coords.x}px, ${coords.y}px)`,
        top: coords.y,
        left: coords.x,
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      tabIndex={0}
    >
      <div className={`modal ${addModal ? "active" : ""}`}>
        <div className="bg"></div>
        <div className="modal-content">
          <h3>Add {urlInput} as an app</h3>
          <form action="#">
            <input
              type="text"
              placeholder="App URL..."
              required
              defaultValue={urlInput}
            />
            <input
              type="text"
              placeholder="App name"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
            <div className="buttons">
              <button className="cancel" onClick={() => setAddModal(false)}>
                Cancel
              </button>
              <button
                type="submit"
                className="submit"
                onClick={() => saveNewApp()}
              >
                Add app
              </button>
            </div>
          </form>
        </div>
      </div>
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
          <>
            <button
              className="navBtn left"
              onClick={() => webFrame.current.goBack()}
            >
              <ChevronLeft size="15" />
            </button>
            <button
              className="navBtn right"
              onClick={() => webFrame.current.goForward()}
            >
              <ChevronRight size="15" />
            </button>
            <button
              className="navBtn reload"
              onClick={() => webFrame.current.reload()}
            >
              <Reload size="15" />
            </button>
            <div className="search">
              <input
                type="text"
                placeholder="Enter url..."
                className="search-input"
                onKeyUp={(e) => handleKeyUp(e)}
                onChange={(e) => setUrlInput(e.target.value)}
                value={urlInput}
                defaultValue={props.href}
              />
            </div>
            <button className="addbtn" onClick={() => setAddModal(true)}>
              Add App
            </button>
          </>
        )}
        <div
          className="close"
          onClick={() => props.removeWindow(props.id)}
        ></div>
      </div>
      {/*<iframe
        title={props.label}
        src={url}
        frameBorder="0"
        ref={webFrame}
      ></iframe>*/}
      <webview src={url} ref={webFrame}></webview>
    </div>
  );
};

export default Window;
