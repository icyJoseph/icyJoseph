import type { ComponentPropsWithoutRef, FC } from "react";

import classNames from "classnames";

import {
  GithubLogo,
  ArticleMedium,
  IconProps,
  ShootingStar,
} from "design-system/Icons";

const SocialIcon = ({
  icon: Icon,
  label,
}: {
  icon: FC<IconProps>;
  label: string;
}) => (
  <span>
    <Icon size={32} className="mx-auto" />
    <span className="sr-only">{label}</span>
  </span>
);

const SocialLink = (props: ComponentPropsWithoutRef<"a">) => (
  <a
    {...props}
    className={classNames(props.className, "inline-block")}
    target="_blank"
    rel="noopener noreferrer"
  />
);

export const Social = () => (
  <>
    <SocialLink href="https://github.com/icyJoseph">
      <SocialIcon icon={GithubLogo} label="github" />

      <i>@icyJoseph</i>
    </SocialLink>

    <SocialLink href="https://medium.com/@icjoseph">
      <SocialIcon icon={ArticleMedium} label="medium" />

      <i>@icjoseph</i>
    </SocialLink>

    <SocialLink href="https://github.com/sponsors/icyJoseph">
      <SocialIcon icon={ShootingStar} label="Github sponsorships" />
      Sponsor
    </SocialLink>
  </>
);
