import styled from "styled-components";

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.25em 1em;
  min-width: 200px;
  max-width: 200px;

  > select {
    display: inline-block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background-color: #a9bdbd;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    appearance: none;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
    }
  }
`;
