import { useForm } from "react-hook-form";

import { Text } from "components/Text";

import {
  ErrorMessage,
  Fieldset,
  FormButton,
  Input,
  Label
} from "components/Form";

export function Intention({ callback }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <Label htmlFor="claim">
        <Text my={4}>
          I am happily employed, but I am otherwise open for collaborations,
          hackathons or contributing to packages.
        </Text>
        <Text>Type your reason, or choose one from the dropdown:</Text>
      </Label>

      <form
        onSubmit={handleSubmit((values) => callback(values))}
        autoComplete="off"
      >
        <Fieldset>
          <Input
            id="claim"
            type="text"
            name="claim"
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

          <ErrorMessage error={errors.claim} />

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

        <FormButton type="submit" text="Proceed" />
      </form>
    </>
  );
}
