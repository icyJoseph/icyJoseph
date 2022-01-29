import { Box, BoxProps } from "design-system/Box";
import { textContainer } from "design-system/styles/utility.css";

export const IntroCopy = (props: BoxProps) => (
  <Box {...props} className={textContainer} />
);
