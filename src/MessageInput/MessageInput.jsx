import {Component} from "react";
import React from "react";

// Komponenta omogućuje unos poruke korisniku, ima lokalni state u koji se unosi tekst
class MessageInput extends Component {
  state = {
    text: ""
  }

  // updatea lokalni state sa unosom teksta
  onChange(e) {
    this.setState({text: e.target.value});
  }

  // event handler resetira lokalni state na prazni string
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }

  // vraca HTML formu 
  render() {
    return (
            <form onSubmit={e => this.onSubmit(e)}>
                <div class="input-group mb-0">
                        <div class="input-group-prepend">
                          <button type="submit" class="input-group-text" style={{ height: "100%" }}><i class="fa fa-send"></i></button>
                        </div>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Unesite tekst i pritisnite Enter" 
                          onChange={e => this.onChange(e)}
                          value={this.state.text}
                          autoFocus={true}
                        />                                    
                    </div>
            </form>
        
    );
  }
}

export default MessageInput;