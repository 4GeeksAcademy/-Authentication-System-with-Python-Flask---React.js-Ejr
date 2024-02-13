// import React, { Component } from "react";

// export default class Login extends Component {
//   // export const Login = () => {
//   constructor(props) {
//     super(props);
//     this.state = { email: "", password: "", message: "" };
//   }
//   render() {
//     return (
//       <div>
//         <h4 className="m-1 p-2 border-bottom">Login</h4>

//         {/* Email Starts */}
//         <div className="form-group form-row">
//           <label className="col-lg-4">Email:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={this.state.email}
//             onChange={(event) => {
//               this.setState({ email: event.target.value });
//             }}
//           />
//         </div>
//         {/* Email Ends */}

//         {/* Password Starts */}
//         <div className="form-group form-row">
//           <label className="col-lg-4">Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             value={this.state.password}
//             onChange={(event) => {
//               this.setState({ password: event.target.value });
//             }}
//           />
//         </div>
//         {/* Password Ends */}
//         <div className="text-end p-3">
//           {this.state.message}
//           <button className="btn btn-primary" onClick={this.onLoginClick}>
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }
//   //   End of render method

//   // Executes when the user clicks on Login
//   onLoginClick = async () => {
//     console.log(this.state);

//     var response = await fetch(
//       `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
//       { method: "GET" }
//     );

//     var body = await response.json();
//     console.log(body);

//     if (body.length > 0) {
//       // Success
//       this.setState({
//         message: <span className="text-success">Successfully logged in</span>,
//       });
//     } else {
//       // Error
//       this.setState({
//         message: (
//           <span className="text-danger">Invalid login, please try again. </span>
//         ),
//       });
//     }
//   };
// }
import React, { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const onLoginClick = async () => {
    console.log({ email, password });
    try {
      const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`, { method: 'GET' });
      const body = await response.json();
      console.log(body);
      if (body.length > 0) {
        // Success
        setMessage(<span className="text-success">Successfully logged in</span>);
      } else {
        // Error
        setMessage(<span className="text-danger">Invalid login, please try again.</span>);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(<span className="text-danger">An error occurred during login.</span>);
    }
  };
  return (
    <div>
      <h4 className="m-1 p-2 border-bottom">Login</h4>
      {/* Email Starts */}
      <div className="form-group form-row">
        <label className="col-lg-4">Email:</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {/* Email Ends */}
      {/* Password Starts */}
      <div className="form-group form-row">
        <label className="col-lg-4">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* Password Ends */}
      <div className="text-end p-3">
        {message}
        <button className="btn btn-primary" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;





















