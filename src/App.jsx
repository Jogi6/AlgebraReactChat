import React, { Component } from 'react';
import Chat from "./Chat/Chat";
import { randomColor, randomName } from './Utility/Utility';

class App extends Component {
  state = {
    messages: [],
    members: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  }

  drone = new window.Scaledrone("tHjsnInOpXhV11mZ", {
    data: this.state.member
  });

  componentDidMount() {
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe("observable-room");

    room.on('data', (data, member) => {
      const messages = this.state.messages;
      const timestamp = new Date().toISOString();
      messages.push({member, text: data, timestamp});
      this.setState({messages});
    });

    room.on('members', members => {
      this.setState({ members });
    });
  
    room.on('member_join', member => {
      const members = [...this.state.members];

      if (!members.find(m => m.id === member.id)) {
        members.push(member);
        this.setState({ members });
      }
    });
  
    room.on('member_leave', ({ id }) => {
      const members = this.state.members.filter(member => member.id !== id);
      this.setState({ members });
    });
  }

  render() {
    return (
      <div className="App">
        <Chat
        messages={this.state.messages}
        currentMember={this.state.member}
        onSendMessage={this.onSendMessage}
        members={this.state.members}
        />
      </div>
      
    );
  }

  onSendMessage = message => {
    this.drone.publish({
      room: 'observable-room',
      message,
    });
  };

}

export default App;
