import React from "react";
import { Trash } from "tabler-icons-react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const WebApp = (props) => {
  const container = React.useRef(null);
  const renamer = React.useRef(null);
  const [edit, setEdit] = React.useState(false);
  const [newName, setNewName] = React.useState(props.label);

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      props.setName(props.id, newName);
      setEdit(false);
    } else if (e.keyCode == 27) {
      setNewName(props.label);
      setEdit(false);
    }
  };

  React.useEffect(() => {
    if (edit) {
      setTimeout(() => {
        renamer.current.click();
      }, 50);
    }
  }, [edit]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          className="app clickRegion"
          key={`app-${props.index}`}
          onMouseEnter={(e) => props.handleMouseEnter(e)}
          onClick={(e) => props.handleClick(e)}
          ref={container}
        >
          <img
            className="clickRegion"
            src={props.icon}
            alt={`App: ${props.label}`}
          />
          {edit ? (
            <>
              <input
                className="renamer"
                ref={renamer}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => {
                  setNewName(props.label);
                  setEdit(false);
                }}
                onKeyUp={(e) => handleKeyUp(e)}
              />
            </>
          ) : (
            <p
              className="clickRegion"
              onContextMenu={() => console.log("edit")}
            >
              {props.label}
            </p>
          )}
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="ContextMenuContent">
          <ContextMenu.Item
            className="ContextMenuItem"
            onClick={() => {
              setEdit(true);
            }}
          >
            Rename
          </ContextMenu.Item>
          {!props.noDelete && (
            <ContextMenu.Item
              className="ContextMenuItem delete"
              onClick={() => props.deleteApp(props.id)}
            >
              Delete
            </ContextMenu.Item>
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default WebApp;
