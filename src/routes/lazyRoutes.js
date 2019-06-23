import React, { lazy, Suspense } from "react";

// import ServiceWorkerMessage from "./components/ServiceWorkerMessage";

const Spinner = () => null;

const AsyncSnackbar = lazy(() =>
  import(/*webpackChunkName: "AsyncSnackBar"*/ "../containers/Snackbar")
);

const AsyncTopMenu = lazy(() =>
  import(/*webpackChunkName: "AsyncTopMenu"*/ "../containers/TopMenu")
);

const AsyncLanding = lazy(() =>
  import(/*webpackChunkName: "AsyncLanding"*/ "../containers/Landing")
);

const AsyncHacks = lazy(() =>
  import(/*webpackChunkName: "AsyncHacks"*/ "../containers/Hacks")
);

const AsyncBlog = lazy(() =>
  import(/*webpackChunkName: "AsyncBlog"*/ "../containers/Blog")
);

const AsyncNoMatch = lazy(() =>
  import(/*webpackChunkName: "AsyncNoMatch"*/ "../containers/Placeholder")
);

export function SuspenseTopMenu({ ...props }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncTopMenu {...props} />
    </Suspense>
  );
}

export function SuspenseLanding({ ...props }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncLanding {...props} />
    </Suspense>
  );
}

export function SuspenseBlog({ ...props }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncBlog {...props} />
    </Suspense>
  );
}

export function SuspenseHacks({ ...props }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncHacks {...props} />
    </Suspense>
  );
}

export function SuspenseNoMatch({ ...props }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncNoMatch {...props} situation="404" />
    </Suspense>
  );
}

export function SuspenseSnackbar({ ...props }) {
  return (
    <Suspense fallback={<Spinner />}>
      <AsyncSnackbar {...props} />
    </Suspense>
  );
}
