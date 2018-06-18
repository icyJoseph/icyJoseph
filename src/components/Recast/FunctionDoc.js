import React from "react";
import {
  curryRight,
  get,
  take,
  head,
  pipe,
  split,
  purify
} from "../../functional";
import {
  FunctionCard,
  FunctionName,
  FunctionDescription,
  Frame,
  Syntax
} from "./styled";
import { syntax, descriptions } from "./helpers";

const splitOnSyntax = curryRight(split)(syntax);

export const FunctionDoc = ({ func }) => {
  const line = pipe(
    splitOnSyntax,
    purify
  )(func);

  const name = pipe(
    take(1, 2),
    head
  )(line);

  const { description } = get(descriptions, name);
  return (
    <FunctionCard>
      <FunctionName>{name}</FunctionName>
      <FunctionDescription>{description}</FunctionDescription>
      <Frame>
        {line.map((word, subIndex) => (
          <Syntax key={`${name}-${word}-${subIndex}`} word={word}>
            {word}
          </Syntax>
        ))}
      </Frame>
    </FunctionCard>
  );
};

export default FunctionDoc;
