import React, { Component } from "react";
import ReactDOM from "react-dom";

const portal = document.getElementById("reload-sw");

export const Reloader = ({ children }) =>
  ReactDOM.createPortal(children, portal);

export class ServiceWorkerMessage extends Component {
  state = {
    swUpdate: false
  };

  componentDidMount() {
    window.addEventListener(
      "message",
      event => {
        const { data } = event;
        if (data.type === "WORKER_UPDATE") {
          return this.setState({ swUpdate: true });
        }
      },
      false
    );
  }

  componentWillUnmount() {
    window.removeEventListener("message");
  }

  refreshPage = this.refreshPage.bind(this);
  refreshPage() {
    return new Promise(resolve =>
      resolve(localStorage.removeItem("state"))
    ).then(() => window.location.reload(true));
  }

  render() {
    const { swUpdate } = this.state;
    return (
      <Reloader>
        <Transition.Group animation="slide up" duration={1000}>
          {swUpdate && (
            <Message
              color="black"
              onDismiss={this.refreshPage}
              style={{
                position: "fixed",
                bottom: 100,
                width: "50%",
                left: "50%",
                marginLeft: "-25%",
                borderRadius: "10px"
              }}
            >
              <Message.Header>New Version Available!</Message.Header>
              <Message.Content>
                Close this message to load the new version.
              </Message.Content>
            </Message>
          )}
        </Transition.Group>
      </Reloader>
    );
  }
}

export default ServiceWorkerMessage;
