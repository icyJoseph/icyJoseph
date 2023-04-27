import classNames from "classnames";

import style from "design-system/emoji.module.css";

type EmojiOwnProps = {
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
}: EmojiOwnProps) => (
  <span
    className={classNames(
      className,
      style.emojiFontFamily,
      "font-normal cursor-default"
    )}
    role="img"
    aria-label={ariaLabel}
    title={title}
  >
    {symbol}
  </span>
);

export const BlockEmoji = (props: EmojiOwnProps) => (
  <Emoji {...props} className={classNames(props.className, "block")} />
);
