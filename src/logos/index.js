import React from "react";
import PropTypes from "prop-types";

const CompositeLogo = ({ name, corner, handler, isSelected }) => {
  const semanticProps = isSelected ? { color: "red" } : {};
  return (
    <Icon.Group size="huge" onClick={handler}>
      <Icon inverted name={name} {...semanticProps} />
      {corner && <Icon corner name={corner} color="purple" />}
    </Icon.Group>
  );
};

export const Logo = props => <CompositeLogo {...props} />;

export default Logo;

Logo.propTypes = {
  name: PropTypes.string,
  corner: PropTypes.string,
  handler: PropTypes.func,
  isSelected: PropTypes.bool
};
