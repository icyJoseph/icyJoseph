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

export const RoundEmoji = styled(Emoji)`
  background: ${({ color = "blue", theme }) => `var(${color}, ${theme.blue})`};
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 1),
    0px 0px 4px 1px rgba(255, 255, 255, 1);
`;
