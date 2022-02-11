import { useState, useEffect, type ComponentPropsWithoutRef } from "react";
import { VisuallyHidden } from "design-system/VisuallyHidden";

export const VisuallyHiddenControl = ({
  children,
  ...delegated
}: ComponentPropsWithoutRef<"span">) => {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return <VisuallyHidden {...delegated}>{children}</VisuallyHidden>;
};
