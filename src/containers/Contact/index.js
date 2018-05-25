import React from "react";
import PropTypes from "prop-types";
import { Header, Modal, Button } from "semantic-ui-react";

export const Contact = ({ open, handleClose }) => (
  <Modal
    dimmer={true}
    open={open}
    onClose={handleClose}
    style={{
      width: "100%",
      marginTop: "33.33%"
    }}
    closeOnDocumentClick
  >
    <Modal.Header>Contact</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Email</Header>
        <p>You can reach me via email to:</p>
        <p>contact@icjoseph.com</p>
        <p>Click outside or the close button to resume.</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color="black" onClick={handleClose}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
);

export default Contact;

Contact.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
