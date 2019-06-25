import React, { useState, useEffect, useRef } from "react";
import { Fader } from "./styled";

const safeInc = (max, curr) => {
  const next = curr + 1;
  if (next >= max) {
    return 0;
  }
  return next;
};

export function TextCycle({ titles, links }) {
  const [index, setIndex] = useState(0);
  const [opaque, setOpaque] = useState(false);

  const cycleRef = useRef();
  cycleRef.current = opaque;

  useEffect(() => {
    const indexTimer = setInterval(() => {
      if (cycleRef.current) {
        setIndex(prev => safeInc(titles.length, prev));
        setOpaque(false);
      } else if (!cycleRef.current) {
        setOpaque(true);
      }
    }, 3000);

    return () => {
      clearInterval(indexTimer);
    };
  }, [titles.length]);

  const current = titles[index];
  const href = links[current];
  const target = href === "/" ? "" : "_blank";

  return (
    <Fader opaque={opaque}>
      <a href={href} target={target} rel="noopener noreferrer">
        {current}
      </a>
    </Fader>
  );
}

export default TextCycle;
