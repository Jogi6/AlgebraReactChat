import {Component} from "react";
import React from "react";

class MessageInput extends Component {
  state = {
    text: ""
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
            <form onSubmit={e => this.onSubmit(e)}>
                <div class="input-group mb-0">
                        <div class="input-group-prepend">
                          <button type="submit" class="input-group-text" style={{ height: "100%" }}><i class="fa fa-send"></i></button>
                          {/* <span class="input-group-text" style={{ height: "100%" }}><i class="fa fa-send"></i></span> */}
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