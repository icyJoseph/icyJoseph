import React, { Component, Fragment } from "react";
import { Button } from "semantic-ui-react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

import { MenuWrapper } from "./styled";
import Contact from "../Contact";

export class BottomMenu extends Component {
  state = { contact: false };

  handleClickContact = this.handleClickContact.bind(this);
  handleCloseContact = this.handleCloseContact.bind(this);

  handleClickContact() {
    return this.setState(prevState => ({ contact: !prevState.contact }));
  }

  handleCloseContact() {
    return this.setState({ contact: false });
  }

  render() {
    const { contact } = this.state;

    return (
      <Fragment>
        <MenuWrapper>
          <Button
            circular
            size="huge"
            color="black"
            href="https://github.com/icyJoseph"
            target="_blank"
            rel="noopener noreferrer"
            icon={<Icon name="github alternate" size="large" />}
            style={{ margin: "5px" }}
          />
          <Button
            circular
            size="huge"
            color="black"
            href="https://medium.com/@icjoseph"
            target="_blank"
            rel="noopener noreferrer"
            icon={<Icon name="medium m" size="large" />}
            style={{ margin: "5px" }}
          />
          <Button
            circular
            size="huge"
            color="black"
            onClick={this.handleClickContact}
            icon={<Icon name="mail" size="large" />}
            style={{ margin: "5px" }}
          />
        </MenuWrapper>
        <Contact open={contact} handleClose={this.handleCloseContact} />
      </Fragment>
    );
  }
}

export default BottomMenu;
