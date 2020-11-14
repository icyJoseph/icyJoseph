import {
  space as spaceFn,
  SpaceProps as SpacePropsInterface
} from "@types/styled-system";

declare module "@styled-system/space" {
  export const space: spaceFn;
  export type SpaceProps = SpacePropsInterface;
}
