import { ComponentPropsWithoutRef } from "react";

export const Bold = (props: ComponentPropsWithoutRef<"b">) => (
  <b {...props} className={"inline font-medium text-inherit"} />
);
