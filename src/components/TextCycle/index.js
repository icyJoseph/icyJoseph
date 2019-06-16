import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const indexTimer = setInterval(() => {
      setIndex(prev => safeInc(titles.length, prev));
    }, 4000);

    const opaqueTimer = setInterval(() => {
      setOpaque(prev => !prev);
    }, 2000);

    return () => {
      clearInterval(opaqueTimer);
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
