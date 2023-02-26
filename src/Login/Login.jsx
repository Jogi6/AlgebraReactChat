import React, { Component } from 'react';
import { randomName } from '../Utility/Utility';

class Login extends Component {
  state = {
    username: "",
  };

  handleRandomNameClick = () => {
    const randomUsername = randomName();
    this.setState({ username: randomUsername });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.username);
  };

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='container'>
          <div className='col-md-6 offset-md-3 col-12'>
            <div className='cardLogin'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <h3>Login</h3>
                </div>
              </div>
              <div className='row mb-3'>
                <div className="form-floating mb-3">
                  <input 
                    type="username" 
                    value={this.state.username}
                    onChange={this.handleChange}
                    className="form-control"
                    id="floatingInput"/>
                  <label for="floatingInput">Please enter username</label>
                </div>
              </div>
              <div className='row'>
                    <div className='col-6 mb-3'>
                      <button type="button" className="btn btn-outline-secondary loginButton" onClick={this.handleRandomNameClick}>Random username</button>
                    </div>
                    <div className='col-6 mb-3'>
                      <button type="submit" className="btn btn-outline-success loginButton">Login</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;