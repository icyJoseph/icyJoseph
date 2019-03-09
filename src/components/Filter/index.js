import React from "react";
import { FilterWrapper } from "./styled";
import { capitalize } from "../../functional";

export default ({ onChange, title, options, value, disabled = false }) => (
  <FilterWrapper>
    <select
      id="type-select"
      className="custom-select"
      onChange={onChange}
      disabled={disabled}
      value={value}
    >
      <option value="">{value ? "All" : `Select a ${title}`}</option>
      {options.map(type => (
        <option key={type} value={type}>
          {capitalize(type)}
        </option>
      ))}
    </select>
  </FilterWrapper>
);
