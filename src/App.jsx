import React, { Component } from 'react';
import Chat from "./Chat/Chat";
import Login from './Login/Login';
import { randomColor } from './Utility/Utility';

class App extends Component {
  //Inicijalni state koji ima prazni 'messages' i 'members' array te uz to 'member' objekt
  state = {
    messages: [],
    members: [],
    member: {
      username: "",
      color: randomColor(),
    },
    connected: false,
  };

  //Inicijalizacija drone objekta na 'null', a dalje se događa u 'handleLogin' funkciji kad se korisnik ulogira
  drone = null;

  // 'handleLogin' funkcija je pozvana kada korisnik upiše ili generira random 'username' i stisne "login" gumb u 'Login' komponenti.
  handleLogin = (username) => {
    // Inicijalizira drone objekt sa novim 'member' objektom kojem je dodan novi 'username' pomocu spred operatora
    const member = { ...this.state.member, username };
    // Kreira se nova instanca Scaledrone servisa.
    this.drone = new window.Scaledrone("tHjsnInOpXhV11mZ", { // U zagradam je Scaledrone privati 'id' Scaledrone kanala
      data: member,
    });

    // Ovo je collback funkcija za "open" event u Scaledrone objektu Kada se uspostavi veza sa Scaledrone serverom ova funkcija se poziva.
    this.drone.on("open", () => {
      // Novi 'member' objekt se kreira kojem je dodan novi 'username' pomocu spred operatora, dodaje mu se 'id' od
      // 'drone' objekta 'clientId' postavke koji se vratio kada se uspostavila veza sa serverom na kraju se 'member' objekt
      // sa connected stanjem dodaje u 'state'
      const member = { ...this.state.member, username };
      member.id = this.drone.clientId;
      this.setState({ member, connected: true });
    });

    // Preplaćuje drona i membera na hard codanu sobu "observable-room" kako bi mogao slušalti poduke i dobivati ostale updejtove
    const room = this.drone.subscribe("observable-room");
    
    //event listener koji gleda sobu i dolazne podatke u 'room' objektu, to je collback funkcija koja prima argumente 'data' i 'member' 
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      // dodaje datum kada je poruka zaprimljena
      const timestamp = new Date().toISOString();
      // dodaje podatke poruke da datumom i vremenom u 'messages' array, te ga dodaje u state i ponovno renderira komponentu
      messages.push({ member, text: data, timestamp });
      this.setState({ messages });
    });

    // Ovo je collback funkcija za "members" event u 'room' objektu koji se okida kada se netko spoji ili odspoji iz sobe, collback
    // funkcija napravi update members liste u stateu te ponovno renderira komponentu i nove članove u sobi
    room.on("members", (members) => {
      this.setState({ members });
    });

    // Ovo je collback funkcija za "member_join" event u 'room' objektu
    room.on("member_join", (member) => {
      // kreira se nova 'members' lista pomocu spred operatora
      const members = [...this.state.members];
      // provjera da li već member objekt koji smo dobili kao parametar callback funkcije već postoji, ako ne postoji dodaje ga u
      // members array i na kraju su state
      if (!members.find((m) => m.id === member.id)) {
        members.push(member);
        this.setState({ members });
      }
    });

    // Ovo je collback funkcija za "member_leave" event u 'room' objektu
    room.on("member_leave", ({ id }) => {
      // napuni se 'members' array iz statea i pomocu filter funkcije i 'id' koji smo dobili destrukcijom 'member' objekta u parametru
      // callback funkcije. Pronađeni member se filtrira iz 'members' array-a  i seta se novo stanje statea bez membera koji je otišao
      const members = this.state.members.filter((member) => member.id !== id);
      this.setState({ members });
    });

    // Metoda koja inicira konekciju na 'Scaledrone' koristeći instancu koja je kreirana prije, trigera 'open' event kada se uspostavi veza
    this.drone.connect();
  };

  // Render metoda ispituje da kakvo je 'cojnnected' stanje state-a, ako je false prikazuje login komponentu ako je true
  // prikazuje chat komponentu
  render() {
    return (
      <div className="App">
        {!this.state.connected && (
          <Login onLogin={this.handleLogin} />
        )}
        {this.state.connected && (
          // Chat komponenta prima 'messages', 'currentMember', 'members' i 'onSendMessage' callback funkciju kao props
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

  // onSendMessage callback funkcija se poziva kada korisnik pošalje poruku i publisha ju na drone server u specificiranu sobu
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;