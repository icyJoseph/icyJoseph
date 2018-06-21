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
    const { title, meta, description, height, toggle, experience } = this.props;

    return (
      <CardWrapper experience={experience} onClick={toggle}>
        <TitleWrapper experience={experience}>{title}</TitleWrapper>
        <MetaWrapper experience={experience}>{meta}</MetaWrapper>
        <AnimateHeight duration={500} height={height}>
          <DescriptionWrapper experience={experience}>
            {description}
          </DescriptionWrapper>
        </AnimateHeight>
      </CardWrapper>
    );
  }
}

export default Card;
