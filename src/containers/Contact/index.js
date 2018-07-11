import React from "react";
import PropTypes from "prop-types";
import { Header, Modal, Button } from "semantic-ui-react";
import { ModalWrapper } from "./styled";

export const Contact = ({ open, handleClose }) => (
  <ModalWrapper
    dimmer={true}
    open={open}
    onClose={handleClose}
    closeOnDocumentClick
  >
    <Modal.Header>Contact</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Email</Header>
        <p>You can reach me via email to:</p>
        <p>contact@icjoseph.com</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color="black" onClick={handleClose}>
        Close
      </Button>
    </Modal.Actions>
  </ModalWrapper>
);

export default Contact;

Contact.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
