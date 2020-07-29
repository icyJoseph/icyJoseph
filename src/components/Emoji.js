import styled from "styled-components";
import { space } from "@styled-system/space";

const Base = ({ className, ariaLabel, symbol, title }) => (
  <span className={className} role="img" aria-label={ariaLabel} title={title}>
    {symbol}
  </span>
);

export const Emoji = styled(Base)`
  ${space};
  font-family: apple color emoji, segoe ui emoji, noto color emoji,
    android emoji, emojisymbols, emojione mozilla, twemoji mozilla,
    segoe ui symbol;
`;
