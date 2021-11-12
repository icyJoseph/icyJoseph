import styled from "styled-components";
import { space } from "@styled-system/space";
import { Button } from "components/Button";

export const Form = styled.form`
  ${space({ m: "0 auto" })};
  max-width: 65ch;
`;

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
  min-height: 128px;
  background: transparent;
  border: 1px solid var(--softDark);
`;

const ErrorBase = styled.span<{ visible: boolean }>`
  white-space: nowrap;
  color: var(--red);
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

export const ErrorMessage = ({ error }: { error: Error }) => {
  return <ErrorBase visible={!!error}>{error?.message ?? "&nbsp;"}</ErrorBase>;
};
