import React from "react";
import PropTypes from "prop-types";
import { TitleContainer } from "./styled";

const MainTitle = ({ title, subtitle, as = "h1", center }) => (
  <TitleContainer center={center}>
    <Header
      as={as}
      size="huge"
      textAlign={center ? "center" : "left"}
      style={style}
    >
      {title}
      {subtitle && (
        <Header.Subheader style={{ color: "#f8f8f8" }}>
          {subtitle}
        </Header.Subheader>
      )}
    </Header>
  </TitleContainer>
);

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  as: PropTypes.string,
  center: PropTypes.bool
};

const style = {
  fontSize: "35px",
  lineHeight: "36px",
  color: "white"
};

export default MainTitle;
