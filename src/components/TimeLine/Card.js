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
    const { title, meta, description, height, toggle } = this.props;

    return (
      <CardWrapper onClick={toggle}>
        <TitleWrapper>{title}</TitleWrapper>
        <MetaWrapper>{meta}</MetaWrapper>
        <AnimateHeight duration={500} height={height}>
          <DescriptionWrapper>{description}</DescriptionWrapper>
        </AnimateHeight>
      </CardWrapper>
    );
  }
}

export default Card;
