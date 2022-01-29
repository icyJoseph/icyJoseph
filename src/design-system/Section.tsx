import type { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import { sprinkles, Sprinkles } from "design-system/styles/sprinkles.css";
import { fullPage } from "design-system/styles/utility.css";
import { pickSprinkleProps } from "utils/sprinkleProps";

type SectionProps = ComponentPropsWithoutRef<"section"> & Sprinkles;

type SectionHeaderProps = ComponentPropsWithoutRef<"header"> & Sprinkles;

export const Section = (props: SectionProps) => {
  const { sprinklers, hostProps } = pickSprinkleProps(props);

  return (
    <section
      {...hostProps}
      className={classnames(
        props.className,
        sprinkles({
          my: 3,
          px: 2,
          ...sprinklers
        })
      )}
    />
  );
};

export const SectionHeader = (props: SectionHeaderProps) => {
  const { sprinklers, hostProps } = pickSprinkleProps(props);

  return (
    <header
      {...hostProps}
      className={classnames(
        props.className,
        sprinkles({ pt: 4, ...sprinklers })
      )}
    />
  );
};

export const FullPage = (props: SectionProps) => (
  <Section {...props} className={classnames(props.className, fullPage)} />
);
