import classNames from "classnames";
import Link from "next/link";

// TODO: Make use of Tailwind
const Base = ({
  className = "",
  to,
  label,
  renderAs = "a",
}: {
  className?: string;
  to: string;
  label: string;
  renderAs?: typeof Link | "a";
}) => {
  const Tag = renderAs;
  return (
    <div className={classNames("mt-4 text-right", className)}>
      <Tag href={to} className="font-sans underline text-base text-smoke-white">
        {label}
      </Tag>
    </div>
  );
};

export const BackToTop = () => <Base to="#" label="Back to top" />;

export const BackTo = ({ to, label }: { to: string; label: string }) => (
  <Base renderAs={Link} to={to} label={label} />
);
