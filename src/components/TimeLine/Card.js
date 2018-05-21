import React, { Component } from "react";
import AnimateHeight from "react-animate-height";
import {
  CardWrapper,
  TitleWrapper,
  MetaWrapper,
  DescriptionWrapper
} from "./styled";

export class Card extends Component {
  render() {
    const {
      title,
      meta,
      description,
      left,
      color = "",
      height,
      toggle
    } = this.props;

    return (
      <CardWrapper color={color} left={left} onClick={toggle}>
        <AnimateHeight duration={500} height={height}>
          <TitleWrapper>{title}</TitleWrapper>
          <MetaWrapper>{meta}</MetaWrapper>
          <DescriptionWrapper>{description}</DescriptionWrapper>
        </AnimateHeight>
      </CardWrapper>
    );
  }
}

export default Card;
