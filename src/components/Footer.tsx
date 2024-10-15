import { FooterLinks } from "components/FooterNav";
import { TechStack } from "components/TechStack";
import { Divider } from "design-system/Divider";
import { Keyword } from "design-system/Keyword";

export const Footer = () => {
  return (
    <>
      <div className="py-12 md:py-16" />

      <footer className="w-full px-4 mx-auto md:w-4/5 md:px-0 max-w-5xl">
        <Divider className="mt-0 mb-8" />

        <h2 className="text-2xl">
          icyJoseph
          <p className="mt-2 text-lg">Señor Developer</p>
        </h2>

        <div className="py-4" />

        <div className="flex justify-between gap-8 flex-wrap">
          <TechStack />

          <FooterLinks />
        </div>

        <p className="mx-auto pt-8 text-center">
          &#169; {new Date().getFullYear()} <Keyword>icyJoseph</Keyword> -
          Stockholm, Sweden
        </p>

        <div className="py-6" />
      </footer>
    </>
  );
};
