import React, { forwardRef } from "react";
import { SearchWrap } from "./styled";

export const Search = forwardRef(({ value, onChange }, ref) => (
  <SearchWrap>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      ref={ref}
      title="keyword"
      maxLength={10}
      placeholder="Search..."
      spellCheck="false"
    />
  </SearchWrap>
));

export default Search;
