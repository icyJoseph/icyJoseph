"use client";

import {
  useCallback,
  useId,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
  type FC,
} from "react";

import style from "design-system/showcase.module.css";
import { useVisibleSubscription } from "hooks/useVisibleSubscription";

type VoidVisibilityChangeCallback<Data> = (
  data: Data,
  isVisible: boolean
) => void;

export const ItemShowCase = <Data,>({
  children,
  onVisibilityChange,
  item,
}: {
  children: ReactNode;
  onVisibilityChange?: VoidVisibilityChangeCallback<Data>;
  item: Data;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [observerRef, subscribe] = useVisibleSubscription();
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const root = itemRef?.current?.parentElement?.parentElement ?? undefined;
    const disconnect = subscribe(
      (visible) => {
        onVisibilityChange?.(item, visible);
        setIsVisible(visible);
      },
      { root, threshold: 1 }
    );

    return disconnect;
  }, [subscribe, onVisibilityChange, item]);

  return (
    <li
      className={style.listItem}
      ref={itemRef}
      aria-hidden={isVisible ? "false" : "true"}
    >
      {/* this is a sentinel for intersection */}
      <span ref={observerRef} aria-hidden="true" className={style.sentinel} />
      {children}
    </li>
  );
};

type VisibilityChange<T> = (updated: T, isVisible: boolean) => void;
type WithVisibility<T extends Record<"id", unknown>> = {
  item: T;
  isVisible: boolean;
};
type RenderElement<T> = FC<T>;

const calcVisibleBounds = <T extends Record<"id", unknown>>(
  visibleItems: WithVisibility<T>[]
) => {
  const firstVisibleIndex = visibleItems.findIndex((item) => item.isVisible);
  const visibleCount = visibleItems.filter((item) => item.isVisible).length;
  const lastVisibleIndex = firstVisibleIndex + (visibleCount - 1);

  return [firstVisibleIndex, lastVisibleIndex];
};

const scrollListChildIntoView = (
  listElement: HTMLUListElement,
  target: number
) => {
  const children = listElement.children;
  const child = children.item(target);

  if (!child) return;

  child.scrollIntoView({ block: "nearest" });
};

export const Showcase = <Data extends Record<"id", string>>({
  Component,
  items,
  backIcon,
  forwardIcon,
  ariaLabel,
}: {
  Component: RenderElement<Data>;
  items: Data[];
  backIcon: ReactElement;
  forwardIcon: ReactElement;
  ariaLabel: string;
}) => {
  const [visibleItems, setVisibleItems] = useState<WithVisibility<Data>[]>([]);

  const listId = useId();

  const listRef = useRef<HTMLUListElement>(null);

  const handleVisibilityChange: VisibilityChange<Data> = useCallback(
    (updated, isVisible) => {
      setVisibleItems((current) => {
        return items.map((item, index) => {
          if (item === updated) return { item, isVisible };

          const seen = current[index];
          if (seen && seen.item === item) return seen;

          return { item, isVisible: false };
        });
      });
    },
    [items]
  );

  // Might be worth doing `useMemo`
  const [firstVisibleIndex, lastVisibleIndex] = calcVisibleBounds(visibleItems);

  const disableMoveBack = firstVisibleIndex === 0;

  const disableMoveForward = lastVisibleIndex === items.length - 1;

  const moveBack = () => {
    if (disableMoveBack) return;

    const element = listRef.current;
    if (!element) return;
    scrollListChildIntoView(element, firstVisibleIndex - 1);
  };

  const moveForward = () => {
    if (disableMoveForward) return;

    const element = listRef.current;
    if (!element) return;
    scrollListChildIntoView(element, lastVisibleIndex + 1);
  };

  return (
    <div className={style.wrapper}>
      <ul
        id={listId}
        className={style.list}
        ref={listRef}
        aria-label={ariaLabel}
      >
        {items.map((item) => (
          <ItemShowCase
            key={item.id}
            item={item}
            onVisibilityChange={handleVisibilityChange}
          >
            <Component {...item} />
          </ItemShowCase>
        ))}
      </ul>

      <div
        className={style.sliderControl}
        role="navigation"
        aria-controls={listId}
        aria-label="slider"
      >
        <button
          className={style.controlButton}
          onClick={moveBack}
          aria-label="move to previous"
          aria-disabled={disableMoveBack ? "true" : "false"}
        >
          {backIcon}
        </button>
        <button
          className={style.controlButton}
          onClick={moveForward}
          aria-label="move forward"
          aria-disabled={disableMoveForward ? "true" : "false"}
        >
          {forwardIcon}
        </button>
      </div>
    </div>
  );
};
