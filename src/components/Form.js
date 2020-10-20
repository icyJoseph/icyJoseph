import styled from "styled-components";
import { space } from "@styled-system/space";
import { Button } from "components/Button";

export const FormButton = styled(Button)`
  width: 33%;
  max-width: 512px;
  min-width: 120px;
`;

export const Fieldset = styled.fieldset`
  ${space({ my: 3 })};
  ${space};
`;

export const Input = styled.input`
  ${space({ mr: 2, mb: 2 })};
  ${space};
  width: 100%;
  max-width: 512px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--softDark);
`;

export const Label = styled.label`
  > p {
    ${space({ mb: 2 })};
  }
`;

export const TextArea = styled.textarea`
  resize: none;

  width: 100%;
  max-width: 512px;
  min-height: 128px;

  background: transparent;
  border: 1px solid var(--softDark);
`;

const ErrorBase = styled.span`
  white-space: nowrap;
  color: var(--red);
`;

export const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <ErrorBase>{error.message}</ErrorBase>;
};
