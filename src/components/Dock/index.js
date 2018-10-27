import React from "react";
import PropTypes from "prop-types";
import DockIcon from "./DockIcon";
import { DockWrap } from "./styled";

export const Dock = ({ items, clickHandler }) => {
  return (
    <DockWrap>
      {items.map(tile => (
        <DockIcon key={tile.id} clickHandler={clickHandler} tile={tile} />
      ))}
    </DockWrap>
  );
};

export default Dock;

Dock.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func
};
