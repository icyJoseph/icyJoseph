import React, { Component, Fragment } from "react";
import { Icon, Menu } from "semantic-ui-react";
import Contact from "../Contact";

export class BottomMenu extends Component {
  state = { contact: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleClickContact = (e, { name }) =>
    this.setState({ activeItem: name, contact: !this.state.contact });

  handleCloseContact = () => this.setState({ contact: false });

  render() {
    const { activeItem, contact } = this.state;

    return (
      <Fragment>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%"
          }}
        >
          <Menu
            fluid
            widths={3}
            icon="labeled"
            inverted
            style={{ borderRadius: 0 }}
          >
            <Menu.Item
              name="LinkedIn"
              active={activeItem === "LinkedIn"}
              onClick={this.handleItemClick}
            >
              <Icon name="linkedin" />
              LinkedIn
            </Menu.Item>
            <Menu.Item
              name="GitHub"
              active={activeItem === "GitHub"}
              onClick={this.handleItemClick}
            >
              <Icon name="github alternate" />
              GitHub
            </Menu.Item>
            <Menu.Item
              name="Contact"
              active={activeItem === "Contact"}
              onClick={this.handleClickContact}
            >
              <Icon name="vcard outline" />
              Contact
            </Menu.Item>
          </Menu>
        </div>
        <Contact open={contact} handleClose={this.handleCloseContact} />
      </Fragment>
    );
  }
}

export default BottomMenu;
