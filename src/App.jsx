import React, { Component } from 'react';
import Chat from "./Chat/Chat";
import Login from './Login/Login';
import { randomColor } from './Utility/Utility';

class App extends Component {
  state = {
    messages: [],
    members: [],
    member: {
      username: "",
      color: randomColor(),
    },
    connected: false,
  };

  drone = null;

  componentDidMount() {
    // Drone initialization will be done after the user enters a username
  }

  handleLogin = (username) => {
    // Initialize the drone object with the new username
    const member = { ...this.state.member, username };
    this.drone = new window.Scaledrone("tHjsnInOpXhV11mZ", {
      data: member,
    });

    // Set the drone.on('open') handler
    this.drone.on("open", () => {
      const member = { ...this.state.member, username };
      member.id = this.drone.clientId;
      this.setState({ member, connected: true });
    });

    // Subscribe to the room and handle events
    const room = this.drone.subscribe("observable-room");

    room.on("data", (data, member) => {
      const messages = this.state.messages;
      const timestamp = new Date().toISOString();
      messages.push({ member, text: data, timestamp });
      this.setState({ messages });
    });

    room.on("members", (members) => {
      this.setState({ members });
    });

    room.on("member_join", (member) => {
      const members = [...this.state.members];

      if (!members.find((m) => m.id === member.id)) {
        members.push(member);
        this.setState({ members });
      }
    });

    room.on("member_leave", ({ id }) => {
      const members = this.state.members.filter((member) => member.id !== id);
      this.setState({ members });
    });

    // Connect to the drone server
    this.drone.connect();
  };

  render() {
    return (
      <div className="App">
        {!this.state.connected && (
          <Login onLogin={this.handleLogin} />
        )}
        {this.state.connected && (
          <Chat
            messages={this.state.messages}
            currentMember={this.state.member}
            onSendMessage={this.onSendMessage}
            members={this.state.members}
          />
        )}
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;