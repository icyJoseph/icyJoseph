import React, { memo } from "react";
import PropTypes from "prop-types";

import TextCycle from "../TextCycle";

export function Brand({ brand, titles, links, clickHandler }) {
  return (
    <div>
      <img src={brand} alt="brand" onClick={clickHandler} />
      <TextCycle titles={titles} links={links} />
    </div>
  );
}

export default memo(Brand);

Brand.propTypes = {
  brand: PropTypes.string,
  clickHandler: PropTypes.func,
  tags: PropTypes.array,
  subtags: PropTypes.object,
  homepages: PropTypes.object
};
