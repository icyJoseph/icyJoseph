import classnames from "classnames";

import { emoji } from "design-system/styles/Emoji.css";
import { Sprinkles, sprinkles } from "design-system/styles/sprinkles.css";

type EmojiOwnProps = Sprinkles & {
  ariaLabel: string;
  symbol: string;
  title?: string;
  className?: string;
};

export const Emoji = ({
  className,
  ariaLabel,
  symbol,
  title,
  ...rest
}: EmojiOwnProps) => (
  <span
    className={classnames(className, emoji, sprinkles(rest))}
    role="img"
    aria-label={ariaLabel}
    title={title}
  >
    {symbol}
  </span>
);
