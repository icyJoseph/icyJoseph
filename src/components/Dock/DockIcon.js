import React from "react";
import PropTypes from "prop-types";
import { IconWrap } from "./styled";
import { curry } from "../../functional";

export const DockIcon = ({ tile, clickHandler, contentId }) => {
  const { id, Component, fill } = tile;
  const injectHandlerWithContent = curry(clickHandler)(id);
  const isSelected = contentId === id;
  return (
    <IconWrap>
      <Component
        handler={injectHandlerWithContent}
        fill={fill}
        isSelected={isSelected}
      />
    </IconWrap>
  );
};

export default DockIcon;

DockIcon.propTypes = {
  tile: PropTypes.shape({
    Component: PropTypes.func,
    fill: PropTypes.string,
    backgroundFill: PropTypes.string,
    Content: PropTypes.func
  }),
  clickHandler: PropTypes.func,
  contentId: PropTypes.number
};
