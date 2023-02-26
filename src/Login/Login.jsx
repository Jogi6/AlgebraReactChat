import { useState } from "react";
import { randomName } from "../Utility/Utility";

function Login({onLogin, onUsernameChange}) {
    const [username, setUsername] = useState("");
  
    const handleLogin = () => {
      onLogin(username);
    };
  
    const handleUsernameChange = (newUsername) => {
      setUsername(newUsername);
      onUsernameChange(newUsername);
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
          <button type="submit">Log in</button>
          <button
            type="submit"
            onClick={() => setUsername(randomName())}
          >
            Generate random username
          </button>
        </form>
      </div>
    );
  }
  

// function Login({onLogin}) {
//     const [username, setUsername] = useState('');
  
//     const handleLogin = () => {
//         onLogin(username);
//     };
  
//     return (
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//           />
//           <button type="submit">Log in</button>
//           <button type="submit" onClick={() => setUsername(randomName())}>
//             Generate random username
//           </button>
//         </form>
//       </div>
//     );
//   }
  
  export default Login;