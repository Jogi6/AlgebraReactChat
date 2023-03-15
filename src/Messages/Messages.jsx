import {Component} from "react";
import React from "react";

// Prikazuje poruke koji su poalali korisnici, prima dva propsa 'messages' i 'member'
class Messages extends Component {
  // mapira preko 'messages' propa i za svaku poruku u arrayu poziva 'renderMessage()' metodu koja prima 'currentMember' prop
  // što je važno kako bismo mogli preko 'id' provjeriti da li je poruka korisnikova ili od nekog drugog korisnika
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
    // id trenutnog korisnika
    const messageFromMe = member.id === currentMember.id;
    // kreiranje slike avatara pomocu DiceBear API
    const avatar = `https://api.dicebear.com/5.x/avataaars/svg?seed=${message.member.clientData.username}`;
    // provjera da li je poruka korisnikova ili od drugogo korisnika i stavlja se adekvata klasa uz to dodaje se lokalizirano vrijeme poslane poruke
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