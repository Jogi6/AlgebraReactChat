import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    const {messages, member } = this.props;
    const currentMember = member;
    return (
      <ul className="m-b-0">
        {messages.map(m => this.renderMessage(m, currentMember))}
      </ul>
    );
  }

  renderMessage(message, currentMember) {
    const { member, text, timestamp } = message;
    const messageFromMe = member.id === currentMember.id;
    const avatar = `https://api.dicebear.com/5.x/avataaars/svg?seed=${message.member.clientData.username}`;
    return messageFromMe ? (
      <li className="clearfix" key={timestamp}>
        <div className="message-data text-end">
          <span className="message-data-time"> {message.member.clientData.username}, {new Date(timestamp).toLocaleTimeString('hr-HR', {hour: '2-digit', minute:'2-digit'})}</span>
          <img src={avatar} alt={`${message.member.clientData.username} avatar`} />
        </div>
        <div className="message my-message float-right"> {text} </div>
      </li>
    ) : (
      <li className="clearfix" key={timestamp}>
        <div className="message-data">
          <img src={avatar} alt={`${message.member.clientData.username} avatar`} />
          <span className="message-data-time"> {message.member.clientData.username}, {new Date(timestamp).toLocaleTimeString('hr-HR', {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <div className="message other-message"> {text} </div>
      </li>
    );
  }
}

export default Messages;