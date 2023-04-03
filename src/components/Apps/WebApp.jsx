import React from "react";
import { Trash } from "tabler-icons-react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const WebApp = (props) => {
  const container = React.useRef(null);
  const [edit, setEdit] = React.useState(false);

  return (
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
        <></>
      ) : (
        <p className="clickRegion" onContextMenu={() => console.log("edit")}>
          {props.label}
        </p>
      )}
      {!props.noDelete && (
        <div className="remove" onClick={() => props.deleteApp(props.id)}>
          <Trash size={15} />
        </div>
      )}
    </div>
  );
};

export default WebApp;
