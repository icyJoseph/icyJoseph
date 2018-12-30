import React from "react";
import PropTypes from "prop-types";

export const Contact = ({ open, handleClose }) =>
  open && (
    <div dimmer={true} open={open} onClose={handleClose}>
      <h2>Contact</h2>
      <div>
        <div>
          <h3>Email</h3>
          <p>You can reach me via email to:</p>
          <p>contact@icjoseph.com</p>
        </div>
      </div>
      <div>
        <button color="black" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );

export default Contact;

Contact.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
