"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue, type SuspenseProps } from "react";

function InnerSuspense(props: SuspenseProps) {
  const search = useSearchParams();

  const defSearch = useDeferredValue(search.toString());

  return <Suspense key={defSearch} {...props} />;
}

export function OuterSuspense(props: SuspenseProps) {
  return (
    <Suspense fallback={props.fallback}>
      <InnerSuspense {...props} />
    </Suspense>
  );
}
