import React, { Component, Fragment } from "react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Item from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import { MenuWrapper } from "./styled";
import Contact from "../Contact";

export class BottomMenu extends Component {
  state = { contact: false };

  handleItemClick = this.handleItemClick.bind(this);
  handleClickContact = this.handleClickContact.bind(this);
  handleCloseContact = this.handleCloseContact.bind(this);

  handleItemClick(e, { name }) {
    return this.setState({ activeItem: name });
  }

  handleClickContact(e, { name }) {
    return this.setState({ activeItem: name, contact: !this.state.contact });
  }

  handleCloseContact() {
    return this.setState({ contact: false });
  }

  render() {
    const { activeItem, contact } = this.state;

    return (
      <Fragment>
        <MenuWrapper
          fluid
          widths={3}
          icon="labeled"
          inverted
          style={{
            borderRadius: 0,
            position: "fixed",
            bottom: 0,
            width: "100%"
          }}
        >
          <Item
            name="LinkedIn"
            active={activeItem === "LinkedIn"}
            onClick={this.handleItemClick}
            href="https://www.linkedin.com/in/joseph-chamochumbi-280255b3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="linkedin" />
            LinkedIn
          </Item>
          <Item
            name="GitHub"
            active={activeItem === "GitHub"}
            onClick={this.handleItemClick}
            href="https://github.com/icyJoseph"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github alternate" />
            GitHub
          </Item>
          <Item
            name="Contact"
            active={activeItem === "Contact"}
            onClick={this.handleClickContact}
          >
            <Icon name="vcard outline" />
            Contact
          </Item>
        </MenuWrapper>
        <Contact open={contact} handleClose={this.handleCloseContact} />
      </Fragment>
    );
  }
}

export default BottomMenu;
