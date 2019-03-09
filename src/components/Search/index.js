import React, { forwardRef } from "react";
import { SearchWrap } from "./styled";

export const Search = forwardRef(({ onChange }, ref) => (
  <SearchWrap>
    <input
      type="text"
      onChange={onChange}
      ref={ref}
      title="keyword"
      maxLength={10}
      placeholder="Search..."
    />
  </SearchWrap>
));

export default Search;
