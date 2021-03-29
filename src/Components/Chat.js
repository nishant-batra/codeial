import React, { Component } from "react";
import "../chat.css";
import io from "socket.io-client";
import { connect } from "react-redux";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: "",
    };
    this.socket = io.connect("http://54.237.158.65:5000");
    this.userEmail = props.user.email;
    if (this.userEmail) {
      this.setupConnection();
    }
  }
  setupConnection = () => {
    const socketConnection = this.socket;
    const self = this;
    socketConnection.on("connect", function () {
      console.log("Connection Established");
      socketConnection.emit("join_room", {
        email: this.userEmail,
        chatroom: "codeial",
      });
      socketConnection.on("user_joined", function (data) {
        console.log("New user joined");
      });
    });
    socketConnection.on("recieve_message", function (data) {
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: "",
      });
    });
  };
  handleSubmit = () => {
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit("send_message", {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: "codeial",
      });
    }
  };
  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yNTYsMEMxMTQuODUzLDAsMCwxMTQuODMzLDAsMjU2czExNC44NTMsMjU2LDI1NiwyNTZjMTQxLjE2NywwLDI1Ni0xMTQuODMzLDI1Ni0yNTZTMzk3LjE0NywwLDI1NiwweiBNMjU2LDQ3Mi4zNDENCgkJCWMtMTE5LjI5NSwwLTIxNi4zNDEtOTcuMDQ2LTIxNi4zNDEtMjE2LjM0MVMxMzYuNzA1LDM5LjY1OSwyNTYsMzkuNjU5UzQ3Mi4zNDEsMTM2LjcwNSw0NzIuMzQxLDI1NlMzNzUuMjk1LDQ3Mi4zNDEsMjU2LDQ3Mi4zNDF6DQoJCQkiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM1NS4xNDgsMjM0LjM4NkgxNTYuODUyYy0xMC45NDYsMC0xOS44Myw4Ljg4NC0xOS44MywxOS44M3M4Ljg4NCwxOS44MywxOS44MywxOS44M2gxOTguMjk2DQoJCQljMTAuOTQ2LDAsMTkuODMtOC44ODQsMTkuODMtMTkuODNTMzY2LjA5NCwyMzQuMzg2LDM1NS4xNDgsMjM0LjM4NnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            alt="minus"
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                messages.self
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
function mapStatetoProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStatetoProps)(Chat);
