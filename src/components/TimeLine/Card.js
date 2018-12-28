import React, { Component } from "react";
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
        <DescriptionWrapper experience={experience}>
          {description}
        </DescriptionWrapper>
      </CardWrapper>
    );
  }
}

export default Card;
