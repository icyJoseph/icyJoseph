---
title: Studying a Reactive Local Storage Hook
slug: use-reactive-local-storage
summary: A study on how to make a reactive local storage. Not a technique to use in production applications.
tags:
  - react
  - react hooks
  - localstorage
authors:
  - Joseph Chamochumbi
publish_date: 1646161450
---

# Reactive Local Storage

A study on how to make a truly reactive local store hook.

Please do not turn this into a library.

> Heads up, this solution ends up using an iframe with `src="javascript:"`, which doesn't sit well with me.
> Although, manual browser testing shows that this was only necessary for Firefox.

## Code

[This repository](https://github.com/icyJoseph/use-reactive-local-storage) contains the code studied on this article.

## Background

Sharing state in a React application is often done through lifting state and then prop drilling, composition, context or through an external state manager.

```jsx
const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <LeftSide count={count} setCount={setCount} />
      <RightSide setCount={setCount} />
    </Fragment>
  );
};
```

In some cases, not only do we need to share state, but we want to persist it across user sessions. The Storage API is used for this matter, most commonly the `localStorage` API.

```ts
const useLocalStorage = (key, fallback) => {
  const [state, setState] = useState(() => {
    const stored = window.localStorage.getItem(key);

    if (stored !== null) return JSON.parse(stored);

    return fallback;
  });

  const prevKey = useRef(key);

  useEffect(() => {
    if (prevKey.current !== key) {
      window.localStorage.removeItem(key);
      prevKey.current = key;
    }

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
```

A naive implementation might look like the snippet above. Clearing the key if it changes during its current use, and always setting a new value when state changes.

When write to the `localStorage`, we serialize our data. When we write to it, we deserialize it.

It is important to be aware of this, because naively, the serialization and deserialization process resolve to new references. So even though the source strings might be the same, we end up with different objects.

Of course one could optimize this away, by keeping a look-up table of strings and references, but there's always a trade-off going on, because now we consume memory storing such a table.

---

## Problem

Could we possibly use the `localStorage` API, to avoid having to lift state, prop drilling or context?

Or in other words, if we have two or more instances of `useLocalStorage` pointing to the same key, can we keep them in sync?

If we created `useCounterFromStorage` using `useLocalStorage`:

```ts
const useCounterFromStorage = (initial) => {
  return useLocalStorage("counter", initial);
};
```

And then instantiate it in different parts of the application, we'll observe that those two are out of sync, even worse, one overrides the other, and unless rendering happens, we don't, update the UI.

## Solutions

We could initially say that, within our application, all communication to the local storage must be made through a set of functions that we are in control of.

It is a stretch, but client side routing works in similar fashion. If you don't use the `Link` provided by the client side router, and use a regular anchor tag instead, your entire application will offload, and the browser will navigate to the new route, whereas with the `Link` the affected Components, unmounted or render as necessary.

At first this would work great, as long as all updates pass through our functions, we can keep the UI in sync.

## Yet another problem

Third party libraries might update the store too. Perhaps this is a blessing in disguise, because poorly formed data, or just plain attempts at attacking our application will have to deal with the lack of reactivity.

The same goes for browser users. By simply opening the developer tools, users can modify the local storage. It may be possible to recover from changes made by users, but if we are actually doing business logic with a third party library that is making changes to some data in the local storage we are in trouble.

One more effort could be to poll on the local storage. Say every second, read to see if a key we care about, has changed.

I think, all things consider this is probably where one would stop going forward with a reactive local storage hook.

## The storage event and cross domain storage

You might be thinking, but there's an event, called `storage` fired when the local storage, and session storage change.

And yes, there's such an event, but the kicker is that it only fires, if the storage changes within the context of another document. For instance another tab loaded on the same domain.

This could be used by businesses or malicious players, to track people across domains, by using an iframe that loads a vendor domain.

Zendesk has an API called [Cross-Storage](https://github.com/zendesk/cross-storage) that helps you do this. However, it has gotchas on Safari and other Apple products. Because these, for better or worse, sandbox storage on iframes to the top level domain using them, effectively breaking cross domain storage tracking.

The cross domain local storage uses `postMessage`, and it is rather difficult to debug, if you ever try to, be ready to spend a lot of time setting things up, but it works! The rough plan here is to have a domain load your iframe, and have it send data via `postMessage` to your iframe. Inside your iframe you listen to `message` events, and upgrade the local storage for your domain accordingly. If there's yet another page loading your iframe you can listen to the `storage` event, and update that second domain as you wish.

## Reactive Local Storage

The key insight in all of this, is that an iframe contains its own document context, and if it's loaded by us, using a source such as `about:blank` (which has a bunch of issues of its own, see this [resource](https://chromium.googlesource.com/chromium/src.git/+/refs/heads/main/docs/special_case_urls.md)), we could attach an event listener on the iframe window, and let our application know that the local storage has changed.

In particular, we could configure our `useLocalStorage` to update the state when such an event happens.

```ts
export const useReactivePersistentState = <Value extends any>(
  key: string,
  init: Value | (() => Value),
  serialize: (value: Value) => string,
  deserialize: (str: string | null) => Value
) => {
  const [state, updateState] = useState(
    init instanceof Function ? init() : init
  );

  useEffect(() => {
    const handler = ({ key: updatedKey, newValue }: StorageEvent) => {
      if (updatedKey !== key) return;

      updateState(deserialize(newValue));
    };

    const value = window.localStorage.getItem(key);

    updateState(deserialize(value));

    const removeEventListener = storage.addEventListener(handler);

    return removeEventListener;
  }, [key]);

  const setState = useCallback(
    (next: Value) => {
      return window.localStorage.setItem(key, serialize(next));
    },
    [key]
  );

  return [state, setState] as const;
};
```

A couple of things here:

- Assume we have a reference to an iframe in the current document.
- `setState`, actually points saves to the current window local storage.
- Attach a `storage` event listener to the iframe.
- When that event fires, update the React state of the hook.

There is also heavy serialization and deserialization going on, which might make an application way slower than it should be. It seems like a lot to pay for little gain. Even worse, if the state is actually the same, we'll end up creating a new reference anyway.

One way out, would be to bail out on setting state, by reading from the store right before returning from `setState`, serialize the update, and compare both, if it's the same string, don't do anything to the local storage.

> This API, doesn't support passing a function to update state, but it could! In fact, I deleted it for this demo.

In the above snippet, to avoid leaking the iframe to the hook, I have an object called `storage`, which exposes the methods I care about. This is how `storage` is made:

```ts
const initReactiveStorage = () => {
  const hostFrame = setupReactiveStorage();

  document.body.appendChild(hostFrame);

  const hostWindow = hostFrame?.contentWindow!;

  const listeners: Listener[] = [];

  const handler = (event: StorageEvent) =>
    listeners.forEach((listener) => listener(event));

  hostWindow.addEventListener("storage", handler, false);

  return {
    addEventListener: (listener: Listener) => {
      listeners.push(listener);

      const removeEventListener = () => {
        const index = listeners.findIndex((fn) => fn === listener);

        listeners.splice(index, 1);
      };

      return removeEventListener;
    },
    close: () => hostWindow.removeEventListener("storage", handler, false)
  };
};
```

The `setupReactiveStorage` function creates an iframe, which `initReactiveStorage` appends to the current document.

```ts
const setupReactiveStorage = () => {
  const frame = document.createElement("iframe");
  frame.frameBorder = "0";
  frame.scrolling = "no";
  frame.width = "1";
  frame.height = "1";
  frame.setAttribute(
    "style",
    "display:block;top:-9999px;left:-9999px;position:absolute;"
  );

  frame.src = "javascript:";

  return frame;
};
```

## And yet another problem

The usage of `javascript:` is far from ideal. At first things worked fine in Chromium based browsers, but then when I started to test in other browsers, immediately I found problems.

After Chrome and Brave, I jumped into Firefox, and there between two tabs the counters fell out of sync.

On a setup with two tabs running the same application, Brave doesn't seem to let the updates happen on the background tab, unless you focus onto it.

The Firefox issue was really strange, because things worked fine for a little moment, and then one of the tabs just became unresponsive to counter changes. However, using `javascript:` on the iframe source made it work. That's a red flag for me.

There's even an [ESLint rule](https://eslint.org/docs/rules/no-script-url) against `javascript:`, and [this Stack Overflow Question](https://stackoverflow.com/questions/13497971/what-is-the-matter-with-script-targeted-urls) expands on why it is not ideal.

## Closing

This was an experiment with React and the local storage, and how far could we bend the rules of storage. It'd discourage anyone from trying to abstract this into a `npm` package or use it in production.

There are certain risks on the fact that this effectively creates a direct path into your React state, from the local storage API. Such a risk is always present when working the local storage, or taking any user input for that matter, but the `useReactiveLocalStorage` from this study makes that particularly more aggressive.
