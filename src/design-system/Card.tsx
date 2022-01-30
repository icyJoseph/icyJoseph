import type { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import { pickSprinkleProps } from "utils/sprinkleProps";
import { sprinkles, Sprinkles } from "design-system/styles/sprinkles.css";
import { cardWrapper } from "design-system/styles/Card.css";

type CardProps = ComponentPropsWithoutRef<"div"> & Sprinkles;

export const Card = (props: CardProps) => {
  const { hostProps, sprinklers } = pickSprinkleProps(props);
  return (
    <div
      {...hostProps}
      className={classnames(
        cardWrapper,
        props.className,
        sprinkles({ py: 3, px: 3, ...sprinklers })
      )}
    />
  );
};

Card.Header = function CardHeader(props: ComponentPropsWithoutRef<"header">) {
  return <header {...props} />;
};

Card.Section = function CardSection(
  props: ComponentPropsWithoutRef<"section">
) {
  return (
    <section
      {...props}
      className={classnames(
        props.className,
        sprinkles({
          display: "flex",
          mt: 4,
          flexWrap: { mobile: "nowrap", tablet: "wrap" }
        })
      )}
    />
  );
};

Card.Footer = function CardFooter(props: ComponentPropsWithoutRef<"footer">) {
  return <footer {...props} />;
};
