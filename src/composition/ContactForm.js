import axios from "axios";
import { useForm, useWatch } from "react-hook-form";

import { Flex } from "components/Flex";
import {
  FormButton,
  Input,
  TextArea,
  Fieldset,
  Label,
  Form,
  ErrorMessage
} from "components/Form";
import { Text } from "components/Text";
import { whiteSpaceValidator } from "utils/whiteSpace";

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CharCount = ({ control, max, min }) => {
  const message = useWatch({ control, name: "Message", defaultValue: "" });
  const length = message.length;
  return (
    <Text
      as="span"
      color={length > max || length < min ? "--red" : "--softDark"}
    >
      {length} / {length < min ? min : max}
    </Text>
  );
};

export function ContactForm({ cloaked, done, reason }) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    reset,
    formState
  } = useForm();
  const { isSubmitting } = formState;

  return (
    <Form
      onSubmit={handleSubmit(async (values) => {
        try {
          const { error } = await axios
            .post(
              "/api/submit",
              { ...values, Reason: reason },
              { withCredentials: true }
            )
            .then(({ data }) => data);

          if (error === "secret") {
            window.alert("Do not copy paste the secret. Write it manually.");
          } else {
            reset();
            done();
          }
        } catch (e) {
          console.debug(e);
          reset();
          done();
        }
      })}
      autoComplete="off"
    >
      <Fieldset>
        <Label htmlFor="firstName">
          <Text>Name</Text>
        </Label>
        <Input
          id="firstName"
          name="Name"
          type="text"
          placeholder="Who are you?"
          ref={register({
            required: "Please identify yourself",
            validate: {
              whiteSpaceValidator
            },
            minLength: { value: 3, message: "That's a very short name" }
          })}
        />
        <ErrorMessage error={errors.Name} />
      </Fieldset>

      <Fieldset>
        <Label htmlFor="email">
          <Text>Email</Text>
        </Label>
        <Input
          id="email"
          name="Email"
          type="email"
          placeholder="What is your email?"
          ref={register({
            required: "An email for an email",
            pattern: {
              value: emailRegExp,
              message: "That doesn't look like an email"
            }
          })}
        />
        <ErrorMessage error={errors.Email} />
      </Fieldset>

      <Fieldset>
        <Label htmlFor="message">
          <Text>Message</Text>
        </Label>
        <TextArea
          id="message"
          name="Message"
          placeholder="What have you got to say?"
          ref={register({
            required: "You ought to write a message",
            validate: {
              whiteSpaceValidator
            },
            minLength: { value: 64, message: "Message is too short" },
            maxLength: { value: 1024, message: "Message is too long" }
          })}
        />
        <Flex justifyContent="space-between">
          <ErrorMessage error={errors.Message} />
          <CharCount control={control} max={1024} min={64} />
        </Flex>
      </Fieldset>

      <Fieldset hidden>
        <Label htmlFor="empty">
          <Text>Empty</Text>
        </Label>
        <Input
          id="empty"
          name="empty"
          placeholder="Do not fill this one!"
          ref={register({ minLength: 0, maxLength: 0 })}
        />
        <ErrorMessage error={errors.empty} />
      </Fieldset>

      <Fieldset>
        <Label htmlFor="secret">
          <Text>
            Secret:{" "}
            <Text as="span" color="--blue">
              {cloaked}
            </Text>
          </Text>
        </Label>
        <Input
          id="secret"
          name="secret"
          placeholder="Manually write the secret here!"
          ref={register({
            required: "Manually write the secret"
          })}
        />
        <ErrorMessage error={errors.secret} />
      </Fieldset>

      <Flex flexWrap="wrap" justifyContent="space-around" mt={4}>
        <FormButton
          type="submit"
          text={isSubmitting ? "Sending" : "Send"}
          disabled={isSubmitting}
        />
        <FormButton
          type="reset"
          variant="outlined"
          text="Reset"
          disabled={isSubmitting}
        />
      </Flex>
    </Form>
  );
}
