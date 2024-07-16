---
title: State with Dependency Tracking
slug: state-with-dependency-tracking
summary: A study on how to render a component, only when the properties it accesses change. This technique is used in production by SWR.
tags:
  - react
  - react hooks
  - swr
authors:
  - Joseph Chamochumbi
publish_date: 1647290148
---

#  Dependency Tracking

Inside libraries like `swr` lies a very interesting construct.

A state hook that can keep track of which parts of the state are being used.

It does this to render the consumer component, only when the pieces of state it consumes change, otherwise, it ignores the change.

The [swr@1.3.0 code](https://github.com/vercel/swr/blob/1.3.0/src/utils/state.ts#L12) summarizes it better than I can:

> If a state property (data, error or isValidating) is accessed by the render function, we mark the property as a dependency so if it is updated again in the future, we trigger a re-render.
> 
> This is also known as dependency-tracking.

### Update

After `swr@2`, and further, `swr` uses `useSyncExternalStore`, but the idea of tracking accessed properties lives on:

- [`isEqual` function](https://github.com/vercel/swr/blob/main/src/core/use-swr.ts#L152)
- Which [is used here](https://github.com/vercel/swr/blob/main/src/core/use-swr.ts#L245)
- Code [comment explanation](https://github.com/vercel/swr/blob/main/src/core/use-swr.ts#L219)

## Code

[This repository](https://github.com/icyJoseph/state-with-deps) contains the code studied on this article.

## Background

When using React hooks, we want state updates to propagate.

```js
const [count, setCount] = useState(0);
```

For example a call to `setCount` updates the `count` variable, and we expect the component containing this hook to render.

Let's now complicate things a little. Say we have a hook that returns a a list of things, and also the length of the data list.

```js
const useData = (label) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    /* Do something to setData as a function of label */
    /* For example, make a network request, read from localStorage, etc. */
  }, [label, setData]);

  return { length: data.length, data };
};
```

So far so good. `Data` is a list, and `length`, represents the amount of elements in the list.

Now we have an interesting situation, a component using `length` from `useData`, renders when `data` changes, even if the `length` is still the same.

Let's decouple this through an additional hook:

```js
const useDataLength = (label) => {
  const { length } = useData(label);
  return length;
};
```

You might think that because `length` is a number, React can bail out on rendering the consumer if the length is the same between renders, but that's not the case.

```jsx
import { useEffect, useState } from "react";

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      return setData([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return data;
};

const useLength = () => {
  const length = useData().length;

  return length;
};

export default function App() {
  const length = useLength();

  console.count("App: " + length);
  return <div>Hello World</div>;
}
```

With React's Strict Mode on, this snippet counts four times `App: 0`. With Strict Mode off, it counts two times.

The point here is that data changes inside the `setTimeout` to a different list, that just happens to have the same length.

To bail out from the update, we need to return the same reference, for example by doing `prev => prev` on `setData`.

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    return setData((prev) => prev);
  }, 1000);

  return () => clearTimeout(timer);
}, []);
```

With this modification, and React's Strict Mode on, this counts two times `App: 0`, and with Strict Mode off, it counts once.

You might even think that one could fix this, by wrapping length inside an object, and then wrap that with `useMemo`, like so:

```ts
const useLength = (label: string) => {
  const { length } = useData(label);

  return useMemo(
    () => ({
      length
    }),
    [length]
  );
};
```

But the issue here is that `useData` would still be contained within who ever is calling this hook, and that'll make those render.

---

### Empty objects as default values and React rendering

The above often happens in another less obvious way. That is when we use de-structuring default values. In the snippet below, every time we toggle, the data reference is a different empty array, so the effect is triggered.

> Do you dare to uncomment the call to toggle inside `useEffect`

```jsx
const useData = () => {
  return { data: undefined };
};

function App() {
  const { data = [] } = useData();

  useEffect(() => {
    console.log("useEffect", data);
    // do you dare to uncomment
    // toggle();
  }, [data]);

  const [, toggle] = useReducer((x) => !x, false);

  return <button onClick={toggle}>Toggle</button>;
}
```

## Specification

In the situation above, how can we create an API, where hook consumers have the choice to read, the length of the data, without rendering again if the data changes, but the length is the same?

We want a hook `useData` which returns, `length`, and `data`.

```tsx
const useData = () => {
  /* What do we do here? */
  return { length, data };
};

const App = () => {
  const { length } = useData();

  console.count("App render");
  return <div>Hello World</div>;
};
```

And when data changes, if it has the same length, we should not add one more to the `App render` count.

## Test case

Since this behavior is kind of counter intuitive, at least for me, we might fool ourselves thinking we have a solution. That's why it is best to seal the desired behavior behind a unit test, and make sure we can write code that passes the test.

> This repository contains the test below. You can find it here: [`src/__tests__/index.test.tsx`](https://github.com/icyJoseph/state-with-deps/blob/main/src/__tests__/index.test.tsx)

```tsx
import { SyntheticEvent, useState, useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useData, useDataWithDepsTracking } from "../useData";

const App = () => {
  const [label, setLabel] = useState("");
  const { length } = useData(label);
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!ref.current) return;

    setLabel(ref.current.value);
  };

  console.log({ length });
  console.count("Render App");

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Enter your string" ref={ref} />
      <button type="submit">submit</button>
    </form>
  );
};

const originalCount = console.count;
const spyCount = jest.fn();

beforeAll(() => {
  console.count = spyCount;
});

afterAll(() => {
  console.count = originalCount;
});

test("Renders only if length changes", () => {
  render(<App />);

  // one render
  expect(spyCount).toHaveBeenCalledTimes(1);

  fireEvent.change(screen.getByPlaceholderText("Enter your string"), {
    target: { value: "12345" }
  });

  fireEvent.click(screen.getByText("submit"));

  // the submission changes label + length recalculation
  expect(spyCount).toHaveBeenCalledTimes(3);

  fireEvent.change(screen.getByPlaceholderText("Enter your string"), {
    target: { value: "54321" }
  });

  fireEvent.click(screen.getByText("submit"));

  // the submission changes label
  // since the length of data is the same, no additional render should happen
  expect(spyCount).toHaveBeenCalledTimes(4);
});
```

And if we implement `useData` like this:

```ts
import { useEffect, useState } from "react";

export const useData = (label: string) => {
  const [data, setData] = useState(label.split(""));

  useEffect(() => {
    setData(label.split(""));
  }, [label, setData]);

  return {
    length: data.length,
    data
  };
};
```

Then we'll have a failing test:

```shell
● Renders only if length changes

    expect(jest.fn()).toHaveBeenCalledTimes(expected)

    Expected number of calls: 1
    Received number of calls: 2

      42 |
      43 |   // one render
    > 44 |   expect(spyCount).toHaveBeenCalledTimes(1);
         |                    ^
      45 |
      46 |   fireEvent.change(screen.getByPlaceholderText("Enter your string"), {
      47 |     target: { value: "12345" }
```

Notice that we don't even get to modify the input field, and the test already failed.

I've also included `useLength` in this repository, so you can try it and see it fail.

Anyway, let's write code to make the test pass!

## Implementation

We'll need a special version of `useState`. Let's call it `useStateWithDeps`.

The `useStateWithDeps` hook needs a signature that extends `useState`'s.

Plain and simple, we need to track which parts of the state are used. How can we do this in vanilla JavaScript?

```js
let obj = (bar) => {
  const access = new Map();
  return {
    get foo() {
      access.set("foo", true);
      return bar;
    },
    access
  };
};

const joe = obj("joe doe");

joe.access.get("foo"); // undefined
joe.foo; // joe doe
joe.access.get("foo"); // true
```

Using a `getter` we can gain knowledge of whether or not a property is being consumed, and store that in a look up table.

Then when processing a state update, we see which parts of the state have changed, and if any of those are in the look up table, we let a render happen.

We need to learn to do a couple of things first:

- Trigger a render at will
- Hold state under React's radar

### Forced render

In React, the easiest way to force a render is to change state to a new reference.

```ts
const [, force] = useState({});

useEffect(() => {
  const timer = setTimeout(() => force({}), 1000);
  return () => clearTimeout(timer);
}, [force]);
```

We've seen this before, calling force after one second with a new object, triggers a render.

An even simpler way would be to do:

```ts
const [, force] = useReducer((x) => !x);

useEffect(() => {
  const timer = setTimeout(force, 1000);
  return () => clearTimeout(timer);
}, [force]);
```

> Either could be packaged into a custom hook

### State under the radar

This is a dangerous thing to do, but you can hold state inside a React `ref`, and control when do you let the React know about the change.

```tsx
const EvenButton = () => {
  const [count, setCount] = useState(0);
  const refState = useRef(count);

  const onClick = () => {
    refState.current = refState.current + 1;
    if (refState.current % 2 === 0) setCount(refState.current);
  };

  return (
    <button onClick={onClick} data-testid="btn">
      {count}
    </button>
  );
};
```

Clicking the button updates the `ref` state, but it only triggers a React renders when the `ref` state holds an even number.

- Click once, the i is set to `1`, but the button still shows `0`
- Click once again, the internal is set to `2`, the button updates to `2`

Don't believe me? Here's a test for it!

> You can find this test here: [`src/__tests__/refState.test.tsx`](https://github.com/icyJoseph/state-with-deps/blob/main/src/__tests__/refState.test.tsx)

```ts
test("State hidden inside a ref", () => {
  render(<EvenButton />);

  expect(screen.getByTestId("btn")).toHaveTextContent("0");

  fireEvent.click(screen.getByTestId("btn"));

  expect(screen.getByTestId("btn")).toHaveTextContent("0");

  fireEvent.click(screen.getByTestId("btn"));

  expect(screen.getByTestId("btn")).toHaveTextContent("2");
});
```

### Putting it all together

By now you might see what's the trick.

- Keep state in a React `ref`
- Update it as one normally would
- Let React know about changes, only if certain conditions are met

We'll store the result from the property `getters` on yet another React `ref`, and use that to know whether or not to let React know about the change. Remember, we let React know about the change, forcing a render.

Let's see one possible implementation of `useStateWithDeps`:

```ts
import { useCallback, useEffect, useRef, useState } from "react";

export function useStateWithDeps<State extends Record<string, unknown>>(
  initialState: State
) {
  const [, rerender] = useState({});

  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const stateRef = useRef(initialState);

  // this is initialized once
  const stateDependenciesRef = useRef<Partial<Record<keyof State, boolean>>>(
    Object.keys(stateRef.current).reduce(
      (prev, curr: keyof State) => ({ ...prev, [curr]: false }),
      {}
    )
  );

  const setState = useCallback(
    (payload: Partial<State>) => {
      let shouldRerender = false;

      const currentState = stateRef.current;

      for (const k in payload) {
        // If the property has changed, update the state
        if (currentState[k] !== payload[k]) {
          currentState[k] = payload[k] as State[typeof k];

          // If the property is accessed, a rerender should be triggered.
          if (stateDependenciesRef.current[k]) {
            shouldRerender = true;
          }
        }
      }

      if (shouldRerender && !unmounted.current) {
        rerender({});
      }
    },
    [rerender]
  );

  return [stateRef, setState, stateDependenciesRef.current] as const;
}
```

As said earlier, we need to expose a similar API to `useState`. In this case, we have the state, the state setter, and the dependency tracker.

From top to bottom. The function signature, which requires an initial state. We then define a force rendering function. Inside a use-effect keep a typical unmount flag.

The next bit, might look confusing, but we are simply going over the initial state and creating a new object, with the same keys, but with `false` as value. When a component uses a piece of state, we flip this boolean to `true`. This is how we know if a state property is used.

Finally, the state setter. It takes in a payload, which doesn't need to contain all properties of state. It loops over the payload keys, updating the keys that need to be updated, and if it sees an update to a tracked dependency, it sets a flag to force a render. Wrapped in `useCallback`, to make it stable. The `rerender` function is stable, so our `setState` function is also stable.

### Usage

This hook is rather special, because even though we have fully constructed it, we still need to do a couple of things from the consumer side to get things working.

We need to tweak how we define `useData`. Do you still remember that hook?

```ts
import { useEffect } from "react";
import { useStateWithDeps } from "./useStateWithDeps";

export const useData = (label: string) => {
  const [stateRef, setState, stateDependencies] = useStateWithDeps({
    data: label.split(""),
    length: 0
  });

  useEffect(() => {
    const data = label.split("");
    setState({ data, length: data.length });
  }, [label, setState]);

  return {
    get data() {
      stateDependencies.data = true;
      return stateRef.current.data;
    },
    get length() {
      stateDependencies.length = true;
      return stateRef.current.length;
    }
  };
};
```

Now, we'll keep track of which dependencies are read, and notify the consumer only when necessary.

Run our tests again, and we see:

```shell
 PASS  src/__tests__/index.test.tsx
```

🎉🎉🎉🎉

We change the label and that itself causes an update, but since that update results in the same length, the hook does not trigger a render once again, even though `data` did change. Exactly what we wanted!

The only renders we account for are, because of the `label` state, and the `length`, when the `data` that creates it changes.

## Critique

This is an optimization technique. Rendering is not necessarily bad. Generally when you have an expensive tree, you'd want to prevent rendering, but not all applications run into such problems.

The use cases for this technique are also contrived. It fits very well for data fetching libraries, where the results are cached, and multiple consumers need to be notified.

Since these consumers might be looking at different parts of state, it makes sense to help by not forcing rendering, if unused parts of state change.

We should understand that these unused parts of the state, are not used by the consumer, but are could be used by library to delivery their value proposition.

For example, if a component doesn't care about the `isValidating` flag, then we should not force it to render when this flag changes, but the library might still need to know internally if validation is happening.

The implementation is kind of leaky. The hook consumer needs to use `getters` to get things working correctly.

All in all, it is a great technique and understanding it helps you test your React mental model, but if you haven't needed it so far, chances are you won't need it in the future either, although a library you use might have a version of it.

## The extra mile

Let's consider a hook that fetches Pokemon. For now let's limit it to the classic 3 starters.

```ts
import { useEffect } from "react";
import { useStateWithDeps } from "./useStateWithDeps";

const fetcher = async (
  pkNumber: number,
  { signal }: { signal: AbortSignal }
) => {
  await new Promise((accept) => setTimeout(accept, 1000 * pkNumber));

  return fetch(`https://pokeapi.co/api/v2/pokemon/${pkNumber}`, {
    signal
  }).then((res) => res.json());
};

type Pokemon = {
  height: number;
  id: number;
  weight: number;
  order: number;
  name: string;
};

type PokemonStarter = {
  bulbasaur: Pokemon | null;
  charmander: Pokemon | null;
  squirtle: Pokemon | null;
};

export const useStarterPokemon = () => {
  const [stateRef, setState, stateDependencies] =
    useStateWithDeps<PokemonStarter>({
      bulbasaur: null,
      charmander: null,
      squirtle: null
    });

  useEffect(() => {
    if (!stateDependencies.bulbasaur) return;

    const controller = new AbortController();

    fetcher(1, { signal: controller.signal })
      .then((data) => setState({ bulbasaur: data }))
      .catch((e) => {
        if (controller.signal.aborted) return;
        setState({ bulbasaur: null });
      });

    return () => controller.abort();
  }, [setState]);

  useEffect(() => {
    if (!stateDependencies.charmander) return;

    const controller = new AbortController();

    fetcher(4, { signal: controller.signal })
      .then((data) => setState({ charmander: data }))
      .catch((e) => {
        if (controller.signal.aborted) return;
        setState({ charmander: null });
      });

    return () => controller.abort();
  }, [setState]);

  useEffect(() => {
    if (!stateDependencies.squirtle) return;

    const controller = new AbortController();

    fetcher(7, { signal: controller.signal })
      .then((data) => setState({ squirtle: data }))
      .catch((e) => {
        if (controller.signal.aborted) return;
        setState({ squirtle: null });
      });

    return () => controller.abort();
  }, [setState]);

  return {
    get bulbasaur() {
      stateDependencies.bulbasaur = true;
      return stateRef.current.bulbasaur;
    },
    get charmander() {
      stateDependencies.charmander = true;
      return stateRef.current.charmander;
    },
    get squirtle() {
      stateDependencies.squirtle = true;
      return stateRef.current.squirtle;
    }
  };
};
```

The `useStateWithDeps` hook makes it possible to query only for the Pokemon we use in our component.

Potentially we could make a hook that fetches every possible Pokemon, but does the work only for the Pokemon required!

```ts
const { charmander } = useStarterPokemon();
```

Of course, this would also do the trick, assuming `usePokemon` can handle the input string:

```ts
const { pokemon: charmander } = usePokemon("charmander");
```

As said in the critique, the use cases for `useStateWithDeps` are kind of limited, and since it is an optimization, you don't need to go and change every use of `useState` with it.

Happy Hacking 🎉!
