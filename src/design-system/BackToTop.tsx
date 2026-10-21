import classNames from "classnames";
import Link from "next/link";

const Base = ({
  className = "",
  linkClassName = "",
  to,
  label,
  renderAs = "a",
  prefetch,
}: {
  className?: string;
  linkClassName?: string;
  to: string;
  label: string;
  renderAs?: typeof Link | "a";
  prefetch?: boolean;
}) => {
  const Tag = renderAs;
  return (
    <div className={classNames("mt-4 text-right", className)}>
      <Tag
        href={to}
        {...(Tag === Link ? { prefetch } : {})}
        className={classNames(
          "font-sans underline text-base text-smoke-white",
          linkClassName,
        )}
      >
        {label}
      </Tag>
    </div>
  );
};

export const BackToTop = ({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
} = {}) => (
  <Base
    to="#"
    label="Back to top"
    className={className}
    linkClassName={linkClassName}
  />
);

export const BackTo = ({
  to,
  label,
  className,
  linkClassName,
}: {
  to: string;
  label: string;
  className?: string;
  linkClassName?: string;
}) => (
  <Base
    renderAs={Link}
    to={to}
    label={label}
    className={className}
    linkClassName={linkClassName}
    prefetch={to === "/blog" || to.startsWith("/blog/") ? true : undefined}
  />
);
