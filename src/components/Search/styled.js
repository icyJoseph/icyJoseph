import styled from "styled-components";

export const SearchWrap = styled.div`
  margin: 1em auto;
  z-index: 2;

  > input {
    background: transparent;
    color: #f8f8f8;
    border: none;
    border-bottom: 2px solid #f8f8f8;
    font-size: 16pt;
    text-align: center;
    max-width: 200px;

    &:focus {
      outline: none;
    }

    &:focus::-webkit-input-placeholder {
      opacity: 0;
    }
  }
`;
