import styled from "styled-components";
import { space, SpaceProps } from "@styled-system/space";

type EmojiOwnProps = {
  ariaLabel: string;
  symbol: string;
  title?: string;
  className?: string;
};

const Base = ({ className, ariaLabel, symbol, title }: EmojiOwnProps) => (
  <span className={className} role="img" aria-label={ariaLabel} title={title}>
    {symbol}
  </span>
);

export const Emoji = styled(Base)<SpaceProps & EmojiOwnProps>`
  ${space};
  font-weight: 400;
  font-family: apple color emoji, segoe ui emoji, noto color emoji,
    android emoji, emojisymbols, emojione mozilla, twemoji mozilla,
    segoe ui symbol;
  cursor: default;
`;

export const BlockEmoji = styled(Emoji)`
  display: block;
`;
