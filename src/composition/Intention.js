import { useForm } from "react-hook-form";
import styled from "styled-components";

import { Text } from "components/Text";

import {
  ErrorMessage,
  Fieldset,
  FormButton,
  Input,
  Label,
  Form
} from "components/Form";
import { Flex } from "components/Flex";

const FormHeader = styled(Flex)`
  max-width: 65ch;
`;

export function Intention({ callback }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <FormHeader m="0 auto">
        <Label htmlFor="reason">
          <Text my={4}>
            I am <strong>happily employed</strong>, but I am otherwise open for
            collaborations, hackathons or contributing to packages.
          </Text>
          <Text>Type your reason, or choose one from the dropdown:</Text>
        </Label>
      </FormHeader>

      <Form
        onSubmit={handleSubmit(({ reason }) => callback(reason))}
        autoComplete="off"
      >
        <Fieldset>
          <Input
            id="reason"
            type="text"
            name="reason"
            placeholder="Contact reason?"
            list="contacting-reasons"
            mt={3}
            ref={register({
              required: "A reason is required.",
              minLength: {
                value: 4,
                message: "Must have at least 4 characters."
              },
              maxLength: { value: 20, message: "Maximum of 20 characters." }
            })}
          />

          <ErrorMessage error={errors.reason} />

          <datalist id="contacting-reasons">
            <option value="Hackathons">Be part of a hackathon team</option>
            <option value="Collaborations">
              Collaborate on a side project
            </option>
            <option value="Packages">Help with a package</option>
            <option value="Recruitment">
              Would like to talk about recruitment
            </option>
          </datalist>
        </Fieldset>

        <FormButton type="submit" text="Proceed" m="0 auto" />
      </Form>
    </>
  );
}
