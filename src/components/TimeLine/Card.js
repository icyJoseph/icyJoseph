import React from "react";
import {
  CardWrapper,
  TitleWrapper,
  MetaWrapper,
  DescriptionWrapper
} from "./styled";

export const Card = ({ title, meta, description, left, color = "" }) => {
  return (
    <CardWrapper color={color} left={left}>
      <TitleWrapper>{title}</TitleWrapper>
      <MetaWrapper>{meta}</MetaWrapper>
      <DescriptionWrapper>{description}</DescriptionWrapper>
    </CardWrapper>
  );
};

export default Card;
