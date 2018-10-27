import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const CompositeLogo = ({ name, corner, handler }) => (
  <Icon.Group size="huge" onClick={handler}>
    <Icon inverted name={name} />
    {corner && <Icon corner name={corner} />}
  </Icon.Group>
);

export const Logo = props => {
  return <CompositeLogo {...props} />;
};

export default Logo;

Logo.propTypes = {
  name: PropTypes.string,
  corner: PropTypes.string,
  handler: PropTypes.func
};
