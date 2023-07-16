import React from "react";

export default function Tile(props) {
  return (
    <div
      className={props.number === 0 ? "empty" : "tile"}
      onClick={props.handleClick}
    >
      {props.number}
    </div>
  );
}
