import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Flex } from "components/Flex";
import { FormButton, Input, TextArea, Fieldset, Label } from "components/Form";
import { Text } from "components/Text";

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Options = styled(Flex)`
  max-width: 512px;
`;

export function ContactForm({ token }) {
  const { register, handleSubmit, errors, reset, formState } = useForm();
  console.log({ errors, formState });

  return (
    <>
      <Text my={2}>Please copy this text into the last field:</Text>
      <Text color="--red">{token}</Text>
      <form
        onSubmit={handleSubmit((values) =>
          axios
            .post("/api/submit", values, { withCredentials: true })
            .then(reset)
        )}
        autoComplete="off"
      >
        <Fieldset>
          <Label htmlFor="firstName">
            <Text>Name</Text>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Who are you?"
            ref={register({ required: true, minLength: 3 })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFot="email">
            <Text>Email</Text>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="What is your email?"
            ref={register({ required: true, pattern: emailRegExp })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="message">
            <Text>Message</Text>
          </Label>
          <TextArea
            id="message"
            name="message"
            placeholder="What have you got to say?"
            ref={register({
              required: true,
              minLength: 64,
              maxLength: 1024
            })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="empty">
            <Text>Empty</Text>
          </Label>
          <Input
            id="empty"
            name="empty"
            placeholder="Do not fill this one"
            ref={register}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="secret">
            <Text>Secret</Text>
          </Label>
          <Input
            id="secret"
            name="secret"
            placeholder="??"
            ref={register({
              required: true,
              minLength: token.length,
              maxLength: token.length
            })}
          />
        </Fieldset>
        <Options flexWrap="wrap" justifyContent="space-around" mt={4}>
          <FormButton type="submit" text="Send" />
          <FormButton type="reset" variant="outlined" text="Reset" />
        </Options>
      </form>
    </>
  );
}
