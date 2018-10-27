import React from "react";
import PropTypes from "prop-types";
import DockIcon from "./DockIcon";
import { DockWrap } from "./styled";

export const Dock = ({ items, clickHandler, contentId }) => {
  return (
    <DockWrap>
      {items.map(tile => (
        <DockIcon
          key={tile.id}
          clickHandler={clickHandler}
          tile={tile}
          contentId={contentId}
        />
      ))}
    </DockWrap>
  );
};

export default Dock;

Dock.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  clickHandler: PropTypes.func,
  contentId: PropTypes.number
};
