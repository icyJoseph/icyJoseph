import { sprinkles, Sprinkles } from "design-system/styles/sprinkles.css";

const keys = [...sprinkles.properties.keys()] as const;

const isSprinkle = (key: string): key is keyof Sprinkles =>
  Boolean(keys.find((k) => k === key));

type Props<T> = {
  sprinklers: Sprinkles;
  hostProps: T;
};

export function pickSprinkleProps<T>(props: T & Sprinkles) {
  const seed: Props<T> = {
    sprinklers: {},
    hostProps: {} as T
  };

  return Object.keys(props).reduce<Props<T>>((prev, key) => {
    if (isSprinkle(key)) {
      return {
        ...prev,
        sprinklers: { ...prev.sprinklers, [key]: props[key] }
      };
    }

    return {
      ...prev,
      hostProps: {
        ...prev.hostProps,
        [key]: props[key as keyof T]
      }
    };
  }, seed);
}
